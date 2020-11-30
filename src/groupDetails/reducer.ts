import fp from 'lodash/fp';
import * as actions from './actions';

export type GroupDetailsState = {
    addingItemToWishlist: boolean;
}

export const initialState: GroupDetailsState = {
    addingItemToWishlist: false
};

const groupDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
    case actions.ADD_WISHLIST_ITEM_REQUEST: {
        return fp.set('addingItemToWishlist', true)(state);
    }
    case actions.CANCEL_ADDING_WISHLIST_ITEM: {
        return fp.set('addingItemToWishlist', false)(state);
    }
    default:
        return state;
    }
};

export default groupDetailsReducer;
