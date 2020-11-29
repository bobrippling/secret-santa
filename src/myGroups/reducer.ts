import fp from 'lodash/fp';
import * as actions from './actions';

export type MyGroupsState = {
    creatingGroup: boolean;
    joiningGroup: boolean;
}

export const initialState: MyGroupsState = {
    creatingGroup: false,
    joiningGroup: false
};

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
    case actions.CREATE_GROUP_REQUEST: {
        return fp.set('creatingGroup', true)(state);
    }
    case actions.CANCEL_CREATING_GROUP: {
        return fp.set('creatingGroup', false)(state);
    }
    case actions.JOIN_GROUP_REQUEST: {
        return fp.set('joiningGroup', true)(state);
    }
    case actions.CANCEL_JOINING_GROUP: {
        return fp.set('joiningGroup', false)(state);
    }
    default:
        return state;
    }
};

export default profileReducer;
