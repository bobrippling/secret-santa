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