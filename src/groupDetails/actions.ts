const pre = 'MY_GROUPS/';

export const ADD_WISHLIST_ITEM_REQUEST = `${pre}ADD_WISHLIST_ITEM_REQUEST`;
export const CANCEL_ADDING_WISHLIST_ITEM = `${pre}CANCEL_ADDING_WISHLIST_ITEM`;

export const REMOVE_WISHLIST_ITEMS_REQUEST = `${pre}REMOVE_WISHLIST_ITEMS_REQUEST`;
export const CANCEL_REMOVING_WISHLIST_ITEMS = `${pre}CANCEL_REMOVING_WISHLIST_ITEMS`;

export type AddWishlistItemRequest = {type: typeof ADD_WISHLIST_ITEM_REQUEST,
    groupId: string, item: string, url: string};

export type CancelAddingWishlistItem = {type: typeof CANCEL_ADDING_WISHLIST_ITEM}

export type RemoveWishlistItemsRequest = {type: typeof REMOVE_WISHLIST_ITEMS_REQUEST
    , groupId: string, items: string[]}

export type CancelRemovingWishlistItems = {type: typeof CANCEL_REMOVING_WISHLIST_ITEMS}

export const addWishlistItemRequest = (groupId: string, item: string, url: string) => ({
    type: ADD_WISHLIST_ITEM_REQUEST,
    item,
    url,
    groupId
});

export const cancelAddingWishlistItem = () => ({
    type: CANCEL_ADDING_WISHLIST_ITEM
});

export const removeWishlistItemsRequest = (groupId: string, items: string[]) => ({
    type: REMOVE_WISHLIST_ITEMS_REQUEST,
    groupId,
    items
});

export const cancelRemovingWishlistItems = () => ({
    type: CANCEL_REMOVING_WISHLIST_ITEMS
});

export type GroupDetailsActions = AddWishlistItemRequest
| CancelAddingWishlistItem
| RemoveWishlistItemsRequest
| CancelRemovingWishlistItems;
