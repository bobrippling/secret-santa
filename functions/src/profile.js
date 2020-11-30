const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.linkFacebookAccount = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return admin.auth().getUser(context.auth.uid).then(
            user => {
                const facebookProfilePicture = user.providerData.find(x => x.providerId === 'facebook.com').photoURL;
                if (facebookProfilePicture) {
                    return db.collection('users').doc(context.auth.uid).update({
                        photoUrl: facebookProfilePicture
                    });
                }
                return Promise.resolve();
            }
        );
    });


exports.updateDisplayName = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!data.displayName) {
            throw new functions.https.HttpsError('invalid-argument', 'Must provide a valid display name');
        }
        return db.collection('users').doc(context.auth.uid).update({
            displayName: data.displayName
        })
    });

exports.updateDisplayNameMappings = functions.region(constants.region).firestore
    .document('users/{id}')
    .onWrite(change => {
        if (!change.after.exists) {
            return Promise.resolve();
        }
        const displayNameBefore = change.before.data().displayName;
        const displayNameAfter = change.after.data().displayName;

        if (displayNameBefore === displayNameAfter) {
            return Promise.resolve();
        }

        const userId = change.after.id;

        return db.collection('groups').where('participants', 'array-contains', userId).get().then(result => {
            console.log("results length", result.docs.length)
            return result.docs.forEach(doc => {
                return doc.ref.update({
                    displayNameMappings: {
                        ...doc.data().displayNameMappings,
                        [userId]: displayNameAfter
                    }
                })
            })
        })

    });