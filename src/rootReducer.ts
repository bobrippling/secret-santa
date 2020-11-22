import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { connectRouter } from 'connected-react-router';

const appReducer = (history: any) => combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    router: connectRouter(history)
});

const rootReducer = (history : any) => (state: any, action: any) => appReducer(history)(state, action);
// if (action.type === authActions.SIGN_OUT_SUCCESS) {
//     // eslint-disable-next-line no-param-reassign
//     state = undefined;
// }

export default rootReducer;
