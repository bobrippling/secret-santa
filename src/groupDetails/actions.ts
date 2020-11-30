const pre = 'MY_GROUPS/';

export const ADD_WISHLIST_ITEM_REQUEST = `${pre}ADD_WISHLIST_ITEM_REQUEST`;
export const CANCEL_ADDING_WISHLIST_ITEM = `${pre}CANCEL_ADDING_WISHLIST_ITEM`;

export type AddWishlistItemRequest = {type: typeof ADD_WISHLIST_ITEM_REQUEST,
    groupId: string, item: string, url: string};

export type CancelAddingWishlistItem = {type: typeof CANCEL_ADDING_WISHLIST_ITEM}

export const addWishlistItemRequest = (groupId: string, item: string, url: string) => ({
    type: ADD_WISHLIST_ITEM_REQUEST,
    item,
    url,
    groupId
});

export const cancelAddingWishlistItem = () => ({
    type: CANCEL_ADDING_WISHLIST_ITEM
});

export type GroupDetailsActions = AddWishlistItemRequest | CancelAddingWishlistItem
