import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as profileApi from './api';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';
import { signOut } from '../auth/actions';

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

export function* updateDisplayName(api, action) {
    try {
        yield call(api.updateDisplayName, { displayName: action.displayName });
        yield put(actions.updateDisplayNameSuccess());
    } catch (error) {
        yield put(setErrorMessage('Error Updating Display Name', error));
    } finally {
        yield put(actions.cancelUpdatingDisplayName());
    }
}

export function* deleteAccount(api) {
    try {
        yield call(api.deleteAccount);
        yield put(signOut());
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Account', error));
    } finally {
        yield put(actions.cancelDeleteAccount());
    }
}

export default function* profileSaga() {
    yield all([
        takeEvery(actions.LINK_PROFILE_TO_GOOGLE, linkProfileToGoogle),
        takeEvery(actions.LINK_PROFILE_TO_FACEBOOK, linkProfileToFacebook, profileApi),
        takeEvery(actions.UPDATE_DISPLAY_NAME_REQUEST, updateDisplayName, profileApi),
        takeEvery(actions.DELETE_ACCOUNT_REQUEST, deleteAccount, profileApi)
    ]);
}
