import {
    all, takeEvery, put
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import firebase from 'firebase';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';
import * as constants from '../constants';
import { redirectRequest } from '../groupDetails/actions';

export function* signOut() {
    try {
        yield put(redirectRequest(constants.URL.SIGN_IN));
        yield firebase.auth().signOut();
        yield put(actions.signOutSuccess());
        yield put(push(constants.URL.SIGN_IN));
    } catch (error) {
        yield put(setErrorMessage('Error Signing Out', error));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.SIGN_OUT, signOut)
    ]);
}
