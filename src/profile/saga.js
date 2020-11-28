import {
    all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';
// import { addNotification } from '../notifications/actions';

export function* linkProfileToGoogle() {
    try {
        console.log('linking with google');
        const provider = new firebase.auth.GoogleAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
        // yield put(addNotification('Profile Successfully linked to Google'));
    } catch (error) {
        yield put(setErrorMessage(`Error Linking Email To Google - ${error.email}`, error));
    }
}

export function* linkProfileToFacebook() {
    try {
        console.log('linking with FB');
        const provider = new firebase.auth.FacebookAuthProvider();
        yield firebase.auth().currentUser.linkWithPopup(provider);
        // yield call(api.linkFacebookAccount);
        // yield put(addNotification('Profile Successfully linked to Facebook'));
    } catch (error) {
        yield put(setErrorMessage, `Error Linking Email To Facebook - ${error.email}`, error);
    }
}
export default function* profileSaga() {
    yield all([
        takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
        takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook)
    ]);
}
