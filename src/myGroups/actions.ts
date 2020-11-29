const pre = 'MY_GROUPS/';

export const CREATE_GROUP_REQUEST = `${pre}CREATE_GROUP_REQUEST`;
export const CANCEL_CREATING_GROUP = `${pre}CANCEL_CREATING_GROUP`;

export const JOIN_GROUP_REQUEST = `${pre}JOIN_GROUP_REQUEST`;
export const CANCEL_JOINING_GROUP = `${pre}CANCEL_JOINING_GROUP`;

export type CreateGroupRequest = {type: typeof CREATE_GROUP_REQUEST,
    groupName: string, priceRange: number | number[] | null, date: Date | null, code: string}

export type JoinGroupRequest = {type: typeof JOIN_GROUP_REQUEST,
        code: string}

export type CancelCreatingGroup = {type: typeof CANCEL_CREATING_GROUP}
export type CancelJoiningGroup = {type: typeof CANCEL_JOINING_GROUP}

export const createGroupRequest = (
    groupName: string,
    priceRange: number | number[] | null,
    date: Date | null,
    code: string
) => ({
    type: CREATE_GROUP_REQUEST,
    groupName,
    priceRange,
    date,
    code
});

export const cancelCreatingGroup = () => ({
    type: CANCEL_CREATING_GROUP
});

export const joinGroupRequest = (code: string) => ({
    type: JOIN_GROUP_REQUEST,
    code
});

export const cancelJoiningGroup = () => ({
    type: CANCEL_JOINING_GROUP
});

export type ProfileActions = CreateGroupRequest
    | CancelCreatingGroup
    | JoinGroupRequest
    | CancelJoiningGroup
