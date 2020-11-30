import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import * as myGroupsApi from './api';
import * as actions from './actions';
import { setErrorMessage } from '../modalHandling/actions';

export function* addItemToWishlist(api, action) {
    try {
        yield call(api.addItemToWishlist, {
            item: action.item,
            url: action.url,
            groupId: action.groupId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Adding Item to Wishlist', error));
    } finally {
        yield put(actions.cancelAddingWishlistItem());
    }
}

export default function* groupDetails() {
    yield all([
        takeEvery(actions.ADD_WISHLIST_ITEM_REQUEST, addItemToWishlist, myGroupsApi)
    ]);
}
