import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import firebase from 'firebase';
import * as myGroupsApi from './api';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';
import { addNotification } from '../notifications/actions';

const getFields = (groupName, priceRange, date, code) => {
    const fields = {
        groupName,
        date: date.toString(),
        code
    };

    if (priceRange) {
        const min = Math.min(...priceRange);
        const max = Math.max(...priceRange);
        fields.min = min;
        fields.max = max;
    } else {
        fields.isNoPriceRange = true;
    }

    return fields;
};

export function* createGroup(api, action) {
    console.log('action', action);
    try {
        const fields = getFields(action.groupName, action.priceRange, action.date, action.code);
        yield call(api.createGroup, fields);
        yield put(addNotification('Group successfully created'));
    } catch (error) {
        yield put(setErrorMessage('Error Creating group', error));
    }
}

export default function* myGroupSaga() {
    yield all([
        takeEvery(actions.CREATE_GROUP_REQUEST, createGroup, myGroupsApi)
    ]);
}
