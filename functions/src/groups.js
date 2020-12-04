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
        console.log("data", data)
        common.isAuthenticated(context);

        if (!data.groupName) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group name');
        }

        if (!data.code) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group code');
        }

        if (data.code.length < 6) {
            throw new functions.https.HttpsError('invalid-argument', 'Group code must be at least 6 characters');
        }

        return db.collection('users').doc(context.auth.uid).get().then(user => {
            return db.collection('groups').add({
                code: data.code,
                groupName: data.groupName,
                isNoPriceRange: data.isNoPriceRange || false,
                status: constants.groupStatuses.WAITING_FOR_PAIRINGS,
                owner: context.auth.uid,
                participants: [context.auth.uid],
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