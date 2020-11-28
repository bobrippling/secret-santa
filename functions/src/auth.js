const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const constants = require('./constants');

const config = functions.config();

const db = admin.firestore();

exports.createUserAccount = functions
    .region(constants.region)
    .auth.user()
    .onCreate(user => db.doc(`users/${user.uid}`).set({
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
    }));