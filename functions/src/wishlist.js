const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

exports.addItem = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.item) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide an item');
        }

        if (!data.groupId) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a group id. Contact Matt');
        }

        return db.collection('groups').doc(data.groupId).get().then(doc => {
            return doc.ref.update({
                wishlist: {
                    ...doc.data().wishlist,
                    [context.auth.uid]: [...doc.data().wishlist[context.auth.uid], {
                        item: data.item,
                        url: data.url || null
                    }]
                }
            })
        })
    });