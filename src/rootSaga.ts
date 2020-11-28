/* eslint-disable  @typescript-eslint/no-explicit-any */
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import profileSaga from './profile/saga';

export default function* rootSaga() : any {
    yield all([
        authSaga(),
        profileSaga()
    ]);
}
