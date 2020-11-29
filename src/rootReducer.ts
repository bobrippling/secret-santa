import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import modalHandling from './modalHandling/reducer';
import * as authActions from './auth/actions';
import * as types from './types';
import profile from './profile/reducer';

const appReducer = (history: History) => combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    modalHandling,
    profile,
    router: connectRouter(history)
});

const rootReducer = (history: History) => (state: types.StoreState | undefined,
    action: types.Actions)
: types.StoreState => {
    if (action.type === authActions.SIGN_OUT) {
        // eslint-disable-next-line no-param-reassign
        state = undefined;
    }
    return appReducer(history)(state, action);
};

export default rootReducer;
