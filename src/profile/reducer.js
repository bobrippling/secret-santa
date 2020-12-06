import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    deletingAccount: false,
    updatingDisplayName: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.UPDATE_DISPLAY_NAME_REQUEST: {
        return fp.set('updatingDisplayName', true)(state);
    }
    case actions.CANCEL_UPDATING_DISPLAY_NAME: {
        return fp.set('updatingDisplayName', false)(state);
    }
    case actions.DELETE_ACCOUNT_REQUEST: {
        return fp.set('deletingAccount', true)(state);
    }
    case actions.CANCEL_DELETE_ACCOUNT: {
        return fp.set('deletingAccount', false)(state);
    }
    default:
        return state;
    }
};

export default profileReducer;
