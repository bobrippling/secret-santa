import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { connectRouter } from 'connected-react-router';
import modalHandling from './modalHandling/reducer';
import groupDetails from './groupDetails/reducer';
import myGroups from './myGroups/reducer';
import * as authActions from './auth/actions';
import profile from './profile/reducer';

const appReducer = history => combineReducers({
    groupDetails,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    modalHandling,
    myGroups,
    profile,
    router: connectRouter(history)
});

const rootReducer = history => (state, action) => {
    if (action.type === authActions.SIGN_OUT) {
        // eslint-disable-next-line no-param-reassign
        state = undefined;
    }
    return appReducer(history)(state, action);
};

export default rootReducer;
