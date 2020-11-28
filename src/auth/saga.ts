import {
    all, takeEvery, put
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';

export function* signOut() {
    try {
        yield firebase.auth().signOut();
        yield put(actions.signOutSuccess());
        yield put(setErrorMessage('Error Signing Out', {
            code: 'code',
            message: 'message'
        }));
    } catch (error) {
        yield put(setErrorMessage('Error Signing Out', error));
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(actions.SIGN_OUT, signOut)
    ]);
}
