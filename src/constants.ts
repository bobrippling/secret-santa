export const mobileScreenSize = 800;

export const REGION = 'europe-west2';

export const URL = {
    SIGN_IN: '/sign-in',
    MY_GROUPS: '/my-groups',
    PROFILE: '/profile',
    GROUP_DETAILS: '/group-details'
};

const WAITING_FOR_PAIRINGS = 'WAITING_FOR_PAIRINGS';

export const groupStatuses = {
    [WAITING_FOR_PAIRINGS]: WAITING_FOR_PAIRINGS
};

export type GroupStatuses = typeof WAITING_FOR_PAIRINGS;
