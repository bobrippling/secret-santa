import {
    all, takeEvery, put, call
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as constants from '../constants';
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

export function* deleteGroup(api, action) {
    try {
        yield call(api.deleteGroup, {
            groupId: action.groupId
        });
        yield put(push(constants.URL.MY_GROUPS));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Group', error));
    } finally {
        yield put(actions.cancelDeletingGroup());
    }
}

export function* redirectRequest(action) {
    yield put(push(action.url));
}

export function* leaveGroup(api, action) {
    try {
        yield call(api.leaveGroup, {
            groupId: action.groupId
        });
        yield put(push(constants.URL.MY_GROUPS));
    } catch (error) {
        yield put(setErrorMessage('Error Leaving Group', error));
    } finally {
        yield put(actions.cancelLeaveGroup());
    }
}

export function* setAddress(api, action) {
    try {
        yield call(api.setAddress, {
            groupId: action.groupId,
            address: action.address
        });
    } catch (error) {
        yield put(setErrorMessage('Error Setting Address', error));
    } finally {
        yield put(actions.cancelAddingDeliveryAddress());
    }
}

export function* kickUser(api, action) {
    try {
        yield call(api.kickUser, {
            groupId: action.groupId,
            userId: action.userId
        });
    } catch (error) {
        yield put(setErrorMessage('Error Kicking User', error));
    } finally {
        yield put(actions.cancelKickingUser());
    }
}

const getFields = (priceRange, date, groupId) => {
    const fields = {
        date: date.toString(),
        groupId
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

export function* regenerate(api, action) {
    try {
        const fields = getFields(action.priceRange, action.date, action.groupId);
        yield call(api.regenerateGroup, fields);
    } catch (error) {
        yield put(setErrorMessage('Error Regenerating Group', error));
    } finally {
        yield put(actions.cancelRegeneratingGroup());
    }
}

export default function* groupDetails() {
    yield all([
        takeEvery(actions.ADD_WISHLIST_ITEM_REQUEST, addItemToWishlist, myGroupsApi),
        takeEvery(actions.REMOVE_WISHLIST_ITEMS_REQUEST, removeWishlistItems, myGroupsApi),
        takeEvery(actions.ADD_GIFT_RESTRICTION_REQUEST, addGiftRestriction, myGroupsApi),
        takeEvery(actions.REMOVE_GIFT_RESTRICTIONS_REQUEST, removeGiftRestrictions, myGroupsApi),
        takeEvery(actions.ASSIGN_PAIRINGS_REQUEST, assignPairings, myGroupsApi),
        takeEvery(actions.DELETE_GROUP_REQIEST, deleteGroup, myGroupsApi),
        takeEvery(actions.REDIRECT_REQUEST, redirectRequest),
        takeEvery(actions.LEAVE_GROUP_REQUEST, leaveGroup, myGroupsApi),
        takeEvery(actions.ADD_DELIVERY_ADDRESS_REQUEST, setAddress, myGroupsApi),
        takeEvery(actions.KICK_USER_REQUEST, kickUser, myGroupsApi),
        takeEvery(actions.REGENERATE_GROUP_REQUEST, regenerate, myGroupsApi)
    ]);
}
