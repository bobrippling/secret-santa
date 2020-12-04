import fp from 'lodash/fp';
import * as actions from './actions';

export type GroupDetailsState = {
    addingItemToWishlist: boolean;
    addingGiftRestriction: boolean;
    removingItemsFromWishlist: boolean;
    removingGiftRestrictions: boolean;
}

export const initialState: GroupDetailsState = {
    addingItemToWishlist: false,
    addingGiftRestriction: false,
    removingItemsFromWishlist: false,
    removingGiftRestrictions: false
};

const groupDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
    case actions.ADD_WISHLIST_ITEM_REQUEST: {
        return fp.set('addingItemToWishlist', true)(state);
    }
    case actions.CANCEL_ADDING_WISHLIST_ITEM: {
        return fp.set('addingItemToWishlist', false)(state);
    }
    case actions.REMOVE_WISHLIST_ITEMS_REQUEST: {
        return fp.set('removingItemsFromWishlist', true)(state);
    }
    case actions.CANCEL_REMOVING_WISHLIST_ITEMS: {
        return fp.set('removingItemsFromWishlist', false)(state);
    }
    case actions.ADD_GIFT_RESTRICTION_REQUEST: {
        return fp.set('addingGiftRestriction', true)(state);
    }
    case actions.CANCEL_ADDING_GIFT_RESTRICTION: {
        return fp.set('addingGiftRestriction', false)(state);
    }
    case actions.REMOVE_GIFT_RESTRICTIONS_REQUEST: {
        return fp.set('removingGiftRestrictions', true)(state);
    }
    case actions.CANCEL_REMOVING_GIFT_RESTRICTIONS: {
        return fp.set('removingGiftRestrictions', false)(state);
    }
    default:
        return state;
    }
};

export default groupDetailsReducer;
