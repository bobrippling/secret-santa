import fp from 'lodash/fp';
import * as actions from './actions';

export type ProfileState = {
    deletingAccount: boolean;
    updatingDisplayName: boolean;
}

export const initialState: ProfileState = {
    deletingAccount: false,
    updatingDisplayName: false
};

const profileReducer = (state = initialState, action: any) => {
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
