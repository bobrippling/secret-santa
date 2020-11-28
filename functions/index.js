const admin = require('firebase-admin');
const functions = require('firebase-functions');

// Need to set config for admin email to be my gmail
const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.auth = require('./src/auth');
exports.profile = require('./src/profile');