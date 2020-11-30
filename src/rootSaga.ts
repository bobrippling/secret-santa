/* eslint-disable  @typescript-eslint/no-explicit-any */
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import profileSaga from './profile/saga';
import groupDetailsSaga from './groupDetails/saga';
import myGroupsSaga from './myGroups/saga';
import notificationSaga from './notifications/saga';

export default function* rootSaga() : any {
    yield all([
        authSaga(),
        groupDetailsSaga(),
        myGroupsSaga(),
        notificationSaga(),
        profileSaga()
    ]);
}
