const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');
const fp = require('lodash/fp');
const constants = require('./constants');

module.exports.isAuthenticated = context => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call this function');
    }
};

module.exports.isNumber = value => Boolean((Number(value) && value) >= 0 || Number(value) === 0);

module.exports.doArraysContainSameElements = (arr,    arrTwo) => _.xor(arr, arrTwo).length === 0;