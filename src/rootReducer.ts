import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import * as authActions from './auth/actions';

const appReducer = (history: any) => combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    router: connectRouter(history)
});

// eslint-disable-next-line max-len
const rootReducer = (history: History) => (state: any, action: any): any => {
    if (action.type === authActions.SIGN_OUT) {
        // eslint-disable-next-line no-param-reassign
        state = undefined;
    }
    return appReducer(history)(state, action);
};

export default rootReducer;
