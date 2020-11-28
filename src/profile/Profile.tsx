import React from 'react';
import { connect } from 'react-redux';
import {
    linkProfileToFacebook, linkProfileToGoogle
} from './actions';
import { StoreState } from '../types';
import * as selectors from './selectors';
import LinkAccounts from './linkaccounts/LinkAccounts';
import styles from './Profile.module.scss';

type Props = {
    isSignedInWithFacebook: boolean;
    isSignedInWithGoogle: boolean;
    isSignedInWithPhone: boolean;

    linkProfileToFacebook: () => void;
    linkProfileToGoogle: () => void;
}

const Profile = (props: Props) => {
    console.log('signed in with facebook', props.isSignedInWithFacebook);
    console.log('signed in with google', props.isSignedInWithGoogle);
    console.log('signed in with phone', props.isSignedInWithPhone);

    return (
        <div>
            Profile
            <div className={styles.bodyWrapper}>
                <LinkAccounts
                    isSignedInWithFacebook={props.isSignedInWithFacebook}
                    isSignedInWithGoogle={props.isSignedInWithGoogle}
                    linkProfileToFacebook={props.linkProfileToFacebook}
                    linkProfileToGoogle={props.linkProfileToGoogle}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    linkProfileToFacebook,
    linkProfileToGoogle
};

const mapStateToProps = (state: StoreState) => ({
    auth: state.firebase.auth,
    isSignedInWithFacebook: selectors.isSignedIn(state, 'facebook.com'),
    isSignedInWithGoogle: selectors.isSignedIn(state, 'google.com'),
    isSignedInWithPhone: selectors.isSignedIn(state, 'phone'),
    profile: selectors.getProfile(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export { Profile as ProfileUnconnected };
