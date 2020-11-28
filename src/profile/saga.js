import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as profileApi from './api';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';

export function* linkProfileToGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
        yield put(addNotification('Profile Successfully linked to Google'));
    } catch (error) {
        yield put(setErrorMessage(`Error Linking Email To Google - ${error.email}`, error));
    }
}

export function* linkProfileToFacebook(api) {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
        yield call(api.linkFacebookAccount);
        yield put(addNotification('Profile Successfully linked to Facebook'));
    } catch (error) {
        yield put(setErrorMessage, `Error Linking Email To Facebook - ${error.email}`, error);
    }
}

// export function* linkProfileToPhone() {
//     try {
//         console.log('link to phone');
//         const recap = firebase.auth.RecaptchaVerifier;
//         yield firebase.auth().currentUser.linkWithPhoneNumber('+447598040467', recap);
//         // yield firebase.auth().currentUser.linkWithPopup(provider);
//         // yield firebase.auth().currentUser.linkWithPhoneNumber();
//         yield put(addNotification('Profile Successfully linked to Phone'));
//     } catch (error) {
//         yield put(setErrorMessage, `Error Linking Account to Phone - ${error.email}`, error);
//     }
// }

export default function* profileSaga() {
    yield all([
        takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
        takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook, profileApi)
    ]);
}
