import fp from 'lodash/fp';
import * as actions from './actions';

export type ProfileState = {
    updatingDisplayName: boolean;
}

export const initialState: ProfileState = {
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
    default:
        return state;
    }
};

export default profileReducer;
