const pre = 'MY_GROUPS/';

export const CREATE_GROUP_REQUEST = `${pre}CREATE_GROUP_REQUEST`;

export type CreateGroupRequest = {type: typeof CREATE_GROUP_REQUEST,
    groupName: string, priceRange: number | number[] | null, date: Date | null, code: string}

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

export type ProfileActions = CreateGroupRequest
