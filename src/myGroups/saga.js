import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import * as myGroupsApi from './api';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';

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
    try {
        const fields = getFields(action.groupName, action.priceRange, action.date, action.code);
        yield call(api.createGroup, fields);
    } catch (error) {
        yield put(setErrorMessage('Error Creating group', error));
    } finally {
        yield put(actions.cancelCreatingGroup());
    }
}

export function* joinGroup(api, action) {
    try {
        yield call(api.joinGroup, {
            code: action.code
        });
    } catch (error) {
        yield put(setErrorMessage('Error Joining group', error));
    } finally {
        yield put(actions.cancelJoiningGroup());
    }
}

export default function* myGroupSaga() {
    yield all([
        takeEvery(actions.CREATE_GROUP_REQUEST, createGroup, myGroupsApi),
        takeEvery(actions.JOIN_GROUP_REQUEST, joinGroup, myGroupsApi)
    ]);
}
