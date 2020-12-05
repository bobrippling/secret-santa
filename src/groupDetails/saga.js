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

export function* addGiftRestriction(api, action) {
    try {
        yield call(api.addGiftRestriction, {
            groupId: action.groupId,
            restriction: action.restriction
        });
    } catch (error) {
        yield put(setErrorMessage('Error Adding Gift Restriction', error));
    } finally {
        yield put(actions.cancelAddingGiftRestriction());
    }
}

export function* removeGiftRestrictions(api, action) {
    try {
        yield call(api.removeGiftRestrictions, {
            groupId: action.groupId,
            restrictions: action.restrictions
        });
    } catch (error) {
        yield put(setErrorMessage('Error Removing Gift Restrictions', error));
    } finally {
        yield put(actions.cancelRemovingGiftRestrictions());
    }
}

export function* assignPairings(api, action) {
    try {
        yield call(api.assignPairings, {
            groupId: action.groupId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Assigning Pairings. Please try again', error));
    } finally {
        yield put(actions.cancelAssigningPairings());
    }
}

export default function* groupDetails() {
    yield all([
        takeEvery(actions.ADD_WISHLIST_ITEM_REQUEST, addItemToWishlist, myGroupsApi),
        takeEvery(actions.REMOVE_WISHLIST_ITEMS_REQUEST, removeWishlistItems, myGroupsApi),
        takeEvery(actions.ADD_GIFT_RESTRICTION_REQUEST, addGiftRestriction, myGroupsApi),
        takeEvery(actions.REMOVE_GIFT_RESTRICTIONS_REQUEST, removeGiftRestrictions, myGroupsApi),
        takeEvery(actions.ASSIGN_PAIRINGS_REQUEST, assignPairings, myGroupsApi)
    ]);
}
