const admin = require('firebase-admin');
const functions = require('firebase-functions');
const _ = require('lodash');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.createGroup = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.groupName) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group name');
        }

        if (data.groupName.length > 40) {
            throw new functions.https.HttpsError('invalid-argument', 'Max group name length is 40');
        }

        if (!data.code) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group code');
        }

        if (data.code.length > 20) {
            throw new functions.https.HttpsError('invalid-argument', 'Max code length is 20');
        }

        if (data.code.length < 6) {
            throw new functions.https.HttpsError('invalid-argument', 'Group code must be at least 6 characters');
        }

        return db.collection('groups').where('code', '==', data.code).get().then(result => {
            if (result.size > 0) {
                throw new functions.https.HttpsError('invalid-argument', 'There is already a group with that code!');
            }
            return db.collection('users').doc(context.auth.uid).get().then(user => {
                return db.collection('groups').add({
                    code: data.code,
                    groupName: data.groupName,
                    isNoPriceRange: data.isNoPriceRange || false,
                    status: constants.groupStatuses.WAITING_FOR_PAIRINGS,
                    owner: context.auth.uid,
                    participants: [context.auth.uid],
                    pairings: {},
                    priceMin: common.isNumber(data.min) ? data.min : null,
                    priceMax: common.isNumber(data.max) ? data.max : null,
                    restrictions: {},
                    displayNameMappings: {
                        [context.auth.uid]: user.data().displayName
                    },
                    wishlist: {
                        [context.auth.uid]: []
                    },
                })
            })
        })        
    });

exports.joinGroup = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.code) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group code');
        }

        if (data.code.length < 6) {
            throw new functions.https.HttpsError('invalid-argument', 'Group code must be at least 6 characters');
        }

        return db.collection('groups').where('code', '==', data.code).get().then(docs => {

            if (docs.size === 0) {
                throw new functions.https.HttpsError('not-found', 'No group with that code exists');
            }

            if (docs.size > 1) {
                throw new functions.https.HttpsError('invalid-argument', 'Big error. Contact Matt');
            }

            if (docs.docs[0].data().status === constants.groupStatuses.PAIRINGS_ASSIGNED) {
                throw new functions.https.HttpsError('invalid-argument', 'This group has already started. Too late to join');
            }
            
            return db.collection('users').doc(context.auth.uid).get().then(user => {
                return docs.docs[0].ref.update({
                    participants: operations.arrayUnion(context.auth.uid),
                    displayNameMappings: {
                        ...docs.docs[0].data().displayNameMappings,
                        [context.auth.uid]: user.data().displayName
                    },
                    wishlist: {
                        ...docs.docs[0].data().wishlist,
                        [context.auth.uid]: []
                    }
                })
            });
        })
    });

exports.addGiftRestriction = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.restriction || data.restriction.length < 2) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid number of restrictions');
        }

        if (!data.groupId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group id. Contact Matt');
        }

        return db.collection('groups').doc(data.groupId).get().then(doc => {

            if (Object.keys(doc.data().restrictions).length >= 10) {
                throw new functions.https.HttpsError('invalid-argument', 'Max of 10 restrictions');
            }

            if (context.auth.uid !== doc.data().owner) {
                throw new functions.https.HttpsError('unauthenticated', 'Only the group owner can add restrictions');
            }

            if (Object.values(doc.data().restrictions).some(r => common.doArraysContainSameElements(r, data.restriction))) {
                throw new functions.https.HttpsError('invalid-argument', 'Cannot add duplicate group restrictions');
            }

            let minKey = 0;

            for (let x = 0; x < constants.maxGiftRestrictionGroups; x += 1) {
                if (!(x in doc.data().restrictions)) {
                    minKey = x;
                    break;
                }
            }

            return doc.ref.update({
                restrictions: {
                    ...doc.data().restrictions,
                    [minKey]: data.restriction
                }
            })
        })
    });

exports.removeGiftRestrictions = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.restrictions || data.restrictions.length === 0) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid number of restrictions');
        }

        if (!data.groupId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group id. Contact Matt');
        }

        return db.collection('groups').doc(data.groupId).get().then(doc => {
            const getRemovedResult = (restrictions, removed) => Object.keys(restrictions)
                .reduce((acc, cur) => (removed.some(x => common.doArraysContainSameElements(x, restrictions[cur])) 
                ? acc : {
                    ...acc,
                [cur]: restrictions[cur]
            }), {});

            return doc.ref.update({
                restrictions: getRemovedResult(doc.data().restrictions, data.restrictions)
            })
        })
    });

exports.assignPairings = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.groupId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group id. Contact Matt');
        }

        return db.collection('groups').doc(data.groupId).get().then(doc => {

            if (context.auth.uid !== doc.data().owner) {
                throw new functions.https.HttpsError('unauthenticated', 'Only the group owner can assign pairings');
            }

            const { restrictions, participants } = doc.data();

            const pairings = common.generatePairings(restrictions, participants)

            return doc.ref.update({
                pairings,
                status: constants.groupStatuses.PAIRINGS_ASSIGNED
            })
        })
    });

exports.deleteGroup = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.groupId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group id. Contact Matt');
        }

        return db.collection('groups').doc(data.groupId).get().then(doc => {
            if (context.auth.uid !== doc.data().owner) {
                throw new functions.https.HttpsError('unauthenticated', 'Only the group owner can delete the group');
            }
            return doc.ref.delete();
        })
    });

exports.leaveGroup = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.groupId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group id. Contact Matt');
        }

        return db.collection('groups').doc(data.groupId).get().then(doc => {
            if (context.auth.uid === doc.data().owner && doc.data().participants && doc.data().participants.length > 1) {
                throw new functions.https.HttpsError('invalid-argument', 'The owner cannot leave if there are people left in the group');
            }

            if (doc.data().participants && doc.data().participants.length === 1) {
                return doc.ref.delete();
            }

            if (doc.data().status === constants.groupStatuses.PAIRINGS_ASSIGNED) {
                throw new functions.https.HttpsError('invalid-argument', 'The group has started. You cannot leave until it has finished');
            }

            return doc.ref.update({
                participants: operations.arrayRemove(context.auth.uid),
                displayNameMappings: _.omit(doc.data().displayNameMappings, context.auth.uid),
                wishlist: _.omit(doc.data().wishlist, context.auth.uid),
            })
            
        })
    });