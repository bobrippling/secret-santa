const pre = 'PROFILE/';

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;
export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;
export const LINK_PROFILE_TO_PHONE = `${pre}LINK_PROFILE_TO_PHONE`;

export const UPDATE_DISPLAY_NAME_REQUEST = `${pre}UPDATE_DISPLAY_NAME_REQUEST`;
export const UPDATE_DISPLAY_NAME_SUCCESS = `${pre}UPDATE_DISPLAY_NAME_SUCCESS`;
export const CANCEL_UPDATING_DISPLAY_NAME = `${pre}CANCEL_UPDATING_DISPLAY_NAME`;

export const DELETE_ACCOUNT_REQUEST = `${pre}DELETE_ACCOUNT_REQUEST`;
export const CANCEL_DELETE_ACCOUNT = `${pre}CANCEL_DELETE_ACCOUNT`;

export const linkProfileToGoogle = () => ({
    type: LINK_PROFILE_TO_GOOGLE
});

export const linkProfileToFacebook = () => ({
    type: LINK_PROFILE_TO_FACEBOOK
});

export const linkProfileToPhone = () => ({
    type: LINK_PROFILE_TO_PHONE
});

export const updateDisplayNameRequest = displayName => ({
    type: UPDATE_DISPLAY_NAME_REQUEST,
    displayName
});

export const updateDisplayNameSuccess = () => ({
    type: UPDATE_DISPLAY_NAME_SUCCESS
});

export const cancelUpdatingDisplayName = () => ({
    type: CANCEL_UPDATING_DISPLAY_NAME
});

export const deleteAccountRequest = () => ({
    type: DELETE_ACCOUNT_REQUEST
});

export const cancelDeleteAccount = () => ({
    type: CANCEL_DELETE_ACCOUNT
});
