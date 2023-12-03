const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');
const fp = require('lodash/fp');
const constants = require('./constants');

module.exports.isAuthenticated = context => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to call this function');
    }
};

module.exports.isNumber = value => Boolean((Number(value) && value) >= 0 || Number(value) === 0);

module.exports.doArraysContainSameElements = (arr, arrTwo) => _.xor(arr, arrTwo).length === 0;

const findPeopleInMyRestriction = (person, restrictions) => Object.values(restrictions).reduce((acc, cur) => {
    if (cur.includes(person)) {
        return _.uniq([...acc, ...cur]);
    }
    return acc;
}, [person]);


const generateReceivers = (restrictions, participants) => {
    const result = [];
    participants.forEach(person => {
        const restricted = findPeopleInMyRestriction(person, restrictions);
        result.push(participants.filter(x => !restricted.includes(x)));
    });
    return result;
};


// // https://pastebin.com/a7yCDf95
module.exports.generatePairings = (restrictions, participants) => {
    const receivers = generateReceivers(restrictions, participants);

    const pairings = {};
    let taken = [];
    const start = _.sample(receivers[0]);
    taken.push(start);
    pairings[participants[0]] = start;

    let repeat = 0;

    while (taken.length < participants.length) {
        repeat += 1;
        if (repeat > 1000) {
            throw new functions.https.HttpsError('invalid-argument', 'Unable to find a pairing that satisfies the restrictions');
        }
        for (let x = 1; x < participants.length; x += 1) {
            const possible = receivers[x];

            const newPossible = possible.filter(x => !taken.includes(x));
            if (newPossible.length) {
                const chosen = _.sample(newPossible);
                taken.push(chosen);
                pairings[participants[x]] = chosen;
            } else {
                taken = [taken[0]];
            }
        }
    }
    return pairings;
};

module.exports.isDateInFuture = date => {
    const providedDate = moment(Date.parse(date));
    const currentDate = moment();
    return providedDate.isAfter(currentDate);
};