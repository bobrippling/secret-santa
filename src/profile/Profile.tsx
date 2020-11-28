import React from 'react';
import { connect } from 'react-redux';
import { linkProfileToFacebook, linkProfileToGoogle, linkProfileToPhone } from './actions';
import { StoreState } from '../types';
import * as selectors from './selectors';
import LinkAccounts from './linkaccounts/LinkAccounts';
import styles from './Profile.module.scss';

type Props = {
    isSignedInWithFacebook: boolean;
    isSignedInWithGoogle: boolean;
    // isSignedInWithPhone: boolean;

    linkProfileToFacebook: () => void;
    linkProfileToGoogle: () => void;
    // linkProfileToPhone: () => void;
}

const Profile = (props: Props) => (
    <div>
        <div className={styles.bodyWrapper}>
            <LinkAccounts
                isSignedInWithFacebook={props.isSignedInWithFacebook}
                isSignedInWithGoogle={props.isSignedInWithGoogle}
                // isSignedInWithPhone={props.isSignedInWithPhone}
                linkProfileToFacebook={props.linkProfileToFacebook}
                linkProfileToGoogle={props.linkProfileToGoogle}
                // linkProfileToPhone={props.linkProfileToPhone}
            />
        </div>
    </div>
);

const mapDispatchToProps = {
    linkProfileToFacebook,
    linkProfileToGoogle,
    linkProfileToPhone
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
