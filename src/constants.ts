export const mobileScreenSize = 800;

export const REGION = 'europe-west2';

export const URL = {
    SIGN_IN: '/sign-in',
    MY_GROUPS: '/my-groups',
    PROFILE: '/profile',
    GROUP_DETAILS: '/group-details',
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_OF_SERVICE: '/terms-of-service'
};

const WAITING_FOR_PAIRINGS = 'WAITING_FOR_PAIRINGS';
const PAIRINGS_ASSIGNED = 'PAIRINGS_ASSIGNED';

export const groupStatuses = {
    [WAITING_FOR_PAIRINGS]: WAITING_FOR_PAIRINGS,
    [PAIRINGS_ASSIGNED]: PAIRINGS_ASSIGNED
};

export type GroupStatuses = typeof WAITING_FOR_PAIRINGS;
