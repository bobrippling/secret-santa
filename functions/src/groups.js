const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();


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

        return db.collection('groups').add({
            code: data.code,
            groupName: data.groupName,
            isNoPriceRange: data.isNoPriceRange || false,
            owner: context.auth.uid,
            participants: [context.auth.uid],
            priceMin: data.min || null,
            priceMax: data.max || null,
        })

    });