import fp from 'lodash/fp';
import { StoreState } from '../types';

export const isSignedIn = (state: StoreState, provider: string) => {
    const providerData = fp.get(
        'providerData'
    )(state.firebase.auth);

    if (!providerData) {
        return false;
    }
    return providerData.some((x:any) => x.providerId === provider);
};

export const getProfile = (state: StoreState) => {
    const { profile } = state.firebase;
    if (!profile.isEmpty) {
        return profile;
    }
    const { auth } = state.firebase;
    return {
        email: fp.get('email')(auth),
        displayName: fp.get('displayName')(auth),
        photoUrl: fp.get('photoURL')(auth),
        teamName: 'N/A'
    };
};
