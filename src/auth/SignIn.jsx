import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import styles from './SignIn.module.scss';

const App: React.FC = () => {
    React.useEffect(() => {
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult(authResult, redirectUrl) {
                    console.log('sign in success', authResult);
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                }
                // uiShown() {
                // // The widget is rendered.
                // // Hide the loader.
                //     document && document.getElementById('loader').style.display = 'none';
                // }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
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
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
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
