const admin = require('firebase-admin');
const functions = require('firebase-functions');
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