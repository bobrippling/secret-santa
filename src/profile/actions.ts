const pre = 'PROFILE/';

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;
export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;
export const LINK_PROFILE_TO_PHONE = `${pre}LINK_PROFILE_TO_PHONE`;

export const UPDATE_DISPLAY_NAME_REQUEST = `${pre}UPDATE_DISPLAY_NAME_REQUEST`;
export const UPDATE_DISPLAY_NAME_SUCCESS = `${pre}UPDATE_DISPLAY_NAME_SUCCESS`;
export const CANCEL_UPDATING_DISPLAY_NAME = `${pre}CANCEL_UPDATING_DISPLAY_NAME`;

export const DELETE_ACCOUNT_REQUEST = `${pre}DELETE_ACCOUNT_REQUEST`;
export const CANCEL_DELETE_ACCOUNT = `${pre}CANCEL_DELETE_ACCOUNT`;

export type LinkProfileToGoogle = {type: typeof LINK_PROFILE_TO_GOOGLE}
export type LinkProfileToFacebook = {type: typeof LINK_PROFILE_TO_FACEBOOK}
export type LinkProfileToPhone = {type: typeof LINK_PROFILE_TO_FACEBOOK}
export type UpdateDisplayNameSuccess = {type: typeof UPDATE_DISPLAY_NAME_SUCCESS}
export type CancelUpdatingDisplayName = {type: typeof CANCEL_UPDATING_DISPLAY_NAME}
export type UpdateDisplayNameRequest = {type: typeof UPDATE_DISPLAY_NAME_REQUEST,
    displayName: string}
export type DeleteAccountRequest = {type: typeof DELETE_ACCOUNT_REQUEST}
export type CancelDeleteAccount = {type: typeof CANCEL_DELETE_ACCOUNT}

export const linkProfileToGoogle = () => ({
    type: LINK_PROFILE_TO_GOOGLE
});

export const linkProfileToFacebook = () => ({
    type: LINK_PROFILE_TO_FACEBOOK
});

export const linkProfileToPhone = () => ({
    type: LINK_PROFILE_TO_PHONE
});

export const updateDisplayNameRequest = (displayName: string) => ({
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

export type ProfileActions = LinkProfileToGoogle
    | LinkProfileToFacebook
    | LinkProfileToPhone
    | UpdateDisplayNameRequest
    | CancelUpdatingDisplayName
    | UpdateDisplayNameSuccess
    | DeleteAccountRequest
    | CancelDeleteAccount;
