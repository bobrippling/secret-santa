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

export function* removeWishlistItems(api, action) {
    try {
        yield call(api.removeItems, {
            items: action.items,
            groupId: action.groupId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Removing Wishlist Items', error));
    } finally {
        yield put(actions.cancelRemovingWishlistItems());
    }
}

export default function* groupDetails() {
    yield all([
        takeEvery(actions.ADD_WISHLIST_ITEM_REQUEST, addItemToWishlist, myGroupsApi),
        takeEvery(actions.REMOVE_WISHLIST_ITEMS_REQUEST, removeWishlistItems, myGroupsApi)
    ]);
}
