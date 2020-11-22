import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import './index.css';
import createRootReducer from './rootReducer';
import { firebaseApp } from './config/fbConfig';
import rootSaga from './rootSaga';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    logErrors: false
};

const sagaMiddleware = createSagaMiddleware();

const isDevelopment = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

const history = createBrowserHistory();

const enhancers = isDevelopment ? compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f)
) : compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

const store = createStore(createRootReducer(history), enhancers);

const rrfProps = {
    firebase: firebaseApp,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

// sagaMiddleware.run(rootSaga);
sagaMiddleware.run(rootSaga, getFirebase);

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App history={history} name="name" />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
