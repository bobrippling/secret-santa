/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { joinGroupRequest } from '../../myGroups/actions';
import * as selectors from '../selectors';
import styles from './Invited.module.scss';
import Spinner from '../../common/spinner/Spinner';
import * as constants from '../../constants';

const Invited = props => {
    const groupId = props.group?.id;
    const groupCode = props.group?.code;
    const participants = props.group?.participants || [];

    React.useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance()
        || new firebaseui.auth.AuthUI(firebase.auth());
        // const ui = new firebaseui.auth.AuthUI(firebase.auth());
        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult(userInfo) {
                    const userId = userInfo?.user?.uid;
                    if (!participants.includes(userId)) {
                        props.joinGroupRequest(groupCode);
                    }
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return false;
                }
                // uiShown() {
                // // The widget is rendered.
                // // Hide the loader.
                //     document && document.getElementById('loader').style.display = 'none';
                // }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: constants.URL.OVERVIEW,
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
        if (groupId) {
            ui.start('#firebaseui-auth-container', uiConfig);
        }
        // eslint-disable-next-line
    }, [groupId, groupCode, participants]);

    if (!props.group) {
        return (
            <div className={styles.spinner}>
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <div className={styles.invitedToJoinGroup}>
                {`You have been invited to join the group ${props.group?.groupName}. Create an account to join!`}
            </div>
            <div id="firebaseui-auth-container" />
        </>
    );
};

const mapDispatchToProps = {
    joinGroupRequest
};

const mapStateToProps = (state, props) => ({
    auth: state.firebase.auth,
    group: selectors.getGroupFromId(state, props)
});

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'groups',
            storeAs: 'groups'
        }
    ])
)(Invited));
