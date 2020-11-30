import fp from 'lodash/fp';
import * as actions from './actions';

export type GroupDetailsState = {
    addingItemToWishlist: boolean;
    removingItemsFromWishlist: boolean;
}

export const initialState: GroupDetailsState = {
    addingItemToWishlist: false,
    removingItemsFromWishlist: false
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
    default:
        return state;
    }
};

export default groupDetailsReducer;
