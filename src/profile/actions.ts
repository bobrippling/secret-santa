const pre = 'PROFILE/';

export const LINK_PROFILE_TO_GOOGLE = `${pre}LINK_PROFILE_TO_GOOGLE`;
export const LINK_PROFILE_TO_FACEBOOK = `${pre}LINK_PROFILE_TO_FACEBOOK`;
export const LINK_PROFILE_TO_PHONE = `${pre}LINK_PROFILE_TO_PHONE`;

export type LinkProfileToGoogle = {type: typeof LINK_PROFILE_TO_GOOGLE}
export type LinkProfileToFacebook = {type: typeof LINK_PROFILE_TO_FACEBOOK}
export type LinkProfileToPhone = {type: typeof LINK_PROFILE_TO_FACEBOOK}

export const linkProfileToGoogle = () => ({
    type: LINK_PROFILE_TO_GOOGLE
});

export const linkProfileToFacebook = () => ({
    type: LINK_PROFILE_TO_FACEBOOK
});

export const linkProfileToPhone = () => ({
    type: LINK_PROFILE_TO_PHONE
});

export type ProfileActions = LinkProfileToGoogle | LinkProfileToFacebook | LinkProfileToPhone;
