const pre = 'MY_GROUPS/';

export const ADD_WISHLIST_ITEM_REQUEST = `${pre}ADD_WISHLIST_ITEM_REQUEST`;
export const CANCEL_ADDING_WISHLIST_ITEM = `${pre}CANCEL_ADDING_WISHLIST_ITEM`;
export const ADD_GIFT_RESTRICTION_REQUEST = `${pre}ADD_GIFT_RESTRICTION_REQUEST`;

export const REMOVE_WISHLIST_ITEMS_REQUEST = `${pre}REMOVE_WISHLIST_ITEMS_REQUEST`;
export const CANCEL_REMOVING_WISHLIST_ITEMS = `${pre}CANCEL_REMOVING_WISHLIST_ITEMS`;
export const CANCEL_ADDING_GIFT_RESTRICTION = `${pre}CANCEL_ADDING_GIFT_RESTRICTION`;
export const REMOVE_GIFT_RESTRICTIONS_REQUEST = `${pre}REMOVE_GIFT_RESTRICTIONS_REQUEST`;
export const CANCEL_REMOVING_GIFT_RESTRICTIONS = `${pre}CANCEL_REMOVING_GIFT_RESTRICTIONS`;
export const ASSIGN_PAIRINGS_REQUEST = `${pre}ASSIGN_PAIRINGS_REQUEST`;
export const CANCEL_ASSIGNING_PAIRINGS = `${pre}CANCEL_ASSIGNING_PAIRINGS`;

export type AddWishlistItemRequest = {type: typeof ADD_WISHLIST_ITEM_REQUEST,
    groupId: string, item: string, url: string};

export type AssignPairingsRequest = {type: typeof ASSIGN_PAIRINGS_REQUEST,
    groupId: string};

export type AddGiftRestrictionRequest = {type: typeof ADD_GIFT_RESTRICTION_REQUEST,
         restriction: string[]}

export type CancelAddingWishlistItem = {type: typeof CANCEL_ADDING_WISHLIST_ITEM}

export type RemoveWishlistItemsRequest = {type: typeof REMOVE_WISHLIST_ITEMS_REQUEST
    , groupId: string, items: string[]}

export type CancelRemovingWishlistItems = {type: typeof CANCEL_REMOVING_WISHLIST_ITEMS}
export type CancelAddingGiftRestriction = {type: typeof CANCEL_ADDING_GIFT_RESTRICTION}
export type CancelRemovingGiftRestrictions = {type: typeof CANCEL_REMOVING_GIFT_RESTRICTIONS}
export type CancelAssigningPairings = {type: typeof CANCEL_ASSIGNING_PAIRINGS}

export type RemoveGiftRestrictionRequests = {type: typeof REMOVE_GIFT_RESTRICTIONS_REQUEST,
    restrictions: string[]}

export const addWishlistItemRequest = (groupId: string, item: string, url: string) => ({
    type: ADD_WISHLIST_ITEM_REQUEST,
    item,
    url,
    groupId
});

export const addGiftRestrictionRequest = (groupId: string, restriction: string[]) => ({
    type: ADD_GIFT_RESTRICTION_REQUEST,
    groupId,
    restriction
});

export const cancelAddingWishlistItem = () => ({
    type: CANCEL_ADDING_WISHLIST_ITEM
});

export const cancelAddingGiftRestriction = () => ({
    type: CANCEL_ADDING_GIFT_RESTRICTION
});

export const removeWishlistItemsRequest = (groupId: string, items: string[]) => ({
    type: REMOVE_WISHLIST_ITEMS_REQUEST,
    groupId,
    items
});

export const cancelRemovingWishlistItems = () => ({
    type: CANCEL_REMOVING_WISHLIST_ITEMS
});

export const removeGiftRestrictionRequests = (groupId: string, restrictions: string[][]) => ({
    type: REMOVE_GIFT_RESTRICTIONS_REQUEST,
    groupId,
    restrictions
});

export const cancelRemovingGiftRestrictions = () => ({
    type: CANCEL_REMOVING_GIFT_RESTRICTIONS
});

export const assignPairingsRequest = (groupId: string) => ({
    type: ASSIGN_PAIRINGS_REQUEST,
    groupId
});

export const cancelAssigningPairings = () => ({
    type: CANCEL_ASSIGNING_PAIRINGS
});

export type GroupDetailsActions = AddWishlistItemRequest
| CancelAddingWishlistItem
| RemoveWishlistItemsRequest
| CancelRemovingWishlistItems
| AddGiftRestrictionRequest
| RemoveGiftRestrictionRequests
| CancelRemovingGiftRestrictions
| AssignPairingsRequest
| CancelAssigningPairings;
