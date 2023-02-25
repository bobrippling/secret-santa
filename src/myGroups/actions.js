const pre = 'MY_GROUPS/';

export const CREATE_GROUP_REQUEST = `${pre}CREATE_GROUP_REQUEST`;
export const CANCEL_CREATING_GROUP = `${pre}CANCEL_CREATING_GROUP`;

export const JOIN_GROUP_REQUEST = `${pre}JOIN_GROUP_REQUEST`;
export const CANCEL_JOINING_GROUP = `${pre}CANCEL_JOINING_GROUP`;

export const createGroupRequest = (
    groupName,
    priceRange,
    date,
    code,
    hideWishlist
) => ({
    type: CREATE_GROUP_REQUEST,
    groupName,
    priceRange,
    date,
    code,
    hideWishlist
});

export const cancelCreatingGroup = () => ({
    type: CANCEL_CREATING_GROUP
});

export const joinGroupRequest = code => ({
    type: JOIN_GROUP_REQUEST,
    code
});

export const cancelJoiningGroup = () => ({
    type: CANCEL_JOINING_GROUP
});
