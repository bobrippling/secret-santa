import React from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import * as constants from '../constants';
import styles from './SignIn.module.scss';

const App = () => {
    React.useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance()
        || new firebaseui.auth.AuthUI(firebase.auth());
        // const ui = new firebaseui.auth.AuthUI(firebase.auth());
        const uiConfig = {
            callbacks: {
                // uiShown() {
                // // The widget is rendered.
                // // Hide the loader.
                //     document && document.getElementById('loader').style.display = 'none';
                // }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            // signInSuccessUrl: constants.URL.OVERVIEW,
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    defaultCountry: 'GB',
                    defaultNationalNumber: '1234567890',
                    loginHint: '+11234567890'
                }
            ],
            tosUrl: constants.URL.TERMS_OF_SERVICE,
            // Privacy policy url.
            privacyPolicyUrl: constants.URL.PRIVACY_POLICY
        };
        ui.start('#firebaseui-auth-container', uiConfig);
    }, []);

    return (
        <>
            <div className={styles.signIn}>Sign In</div>
            <div id="firebaseui-auth-container" />
        </>
    );
};

export default App;
