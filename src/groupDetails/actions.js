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
export const CANCEL_DELETING_GROUP = `${pre}CANCEL_DELETING_GROUP`;
export const REDIRECT_REQUEST = `${pre}REDIRECT_REQUEST`;
export const LEAVE_GROUP_REQUEST = `${pre}LEAVE_GROUP_REQUEST`;
export const DELETE_GROUP_REQIEST = `${pre}DELETE_GROUP_REQIEST`;
export const CANCEL_LEAVE_GROUP = `${pre}CANCEL_LEAVE_GROUP`;
export const ADD_DELIVERY_ADDRESS_REQUEST = `${pre}ADD_DELIVERY_ADDRESS_REQUEST`;
export const CANCEL_ADDING_DELIVERY_ADDRESS = `${pre}CANCEL_ADDING_DELIVERY_ADDRESS`;

export const KICK_USER_REQUEST = `${pre}KICK_USER_REQUEST`;
export const CANCEL_KICKING_USER = `${pre}CANCEL_KICKING_USER`;

export const REGENERATE_GROUP_REQUEST = `${pre}REGENERATE_GROUP_REQUEST`;
export const CANCEL_REGENERATING_GROUP = `${pre}CANCEL_REGENERATING_GROUP`;

export const EDIT_DATE_REQUEST = `${pre}EDIT_DATE_REQUEST`;
export const CANCEL_EDITING_DATE = `${pre}CANCEL_EDITING_DATE`;

export const addWishlistItemRequest = (groupId, item, url) => ({
    type: ADD_WISHLIST_ITEM_REQUEST,
    item,
    url,
    groupId
});

export const addGiftRestrictionRequest = (groupId, restriction) => ({
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

export const removeWishlistItemsRequest = (groupId, items) => ({
    type: REMOVE_WISHLIST_ITEMS_REQUEST,
    groupId,
    items
});

export const cancelRemovingWishlistItems = () => ({
    type: CANCEL_REMOVING_WISHLIST_ITEMS
});

export const removeGiftRestrictionRequests = (groupId, restrictions) => ({
    type: REMOVE_GIFT_RESTRICTIONS_REQUEST,
    groupId,
    restrictions
});

export const cancelRemovingGiftRestrictions = () => ({
    type: CANCEL_REMOVING_GIFT_RESTRICTIONS
});

export const assignPairingsRequest = groupId => ({
    type: ASSIGN_PAIRINGS_REQUEST,
    groupId
});

export const deleteGroupRequest = groupId => ({
    type: DELETE_GROUP_REQIEST,
    groupId
});

export const cancelAssigningPairings = () => ({
    type: CANCEL_ASSIGNING_PAIRINGS
});

export const cancelDeletingGroup = () => ({
    type: CANCEL_DELETING_GROUP
});

export const redirectRequest = url => ({
    type: REDIRECT_REQUEST,
    url
});

export const leaveGroupRequest = groupId => ({
    type: LEAVE_GROUP_REQUEST,
    groupId
});

export const cancelLeaveGroup = () => ({
    type: CANCEL_LEAVE_GROUP
});

export const addDeliveryAddressRequest = (groupId, address) => ({
    type: ADD_DELIVERY_ADDRESS_REQUEST,
    groupId,
    address
});

export const cancelAddingDeliveryAddress = () => ({
    type: CANCEL_ADDING_DELIVERY_ADDRESS
});

export const kickUserRequest = (groupId, userId) => ({
    type: KICK_USER_REQUEST,
    groupId,
    userId
});

export const cancelKickingUser = () => ({
    type: CANCEL_KICKING_USER
});

export const regenerateGroupRequest = (groupId, priceRange, date) => ({
    type: REGENERATE_GROUP_REQUEST,
    groupId,
    priceRange,
    date
});

export const cancelRegeneratingGroup = () => ({
    type: CANCEL_REGENERATING_GROUP
});

export const editDateRequest = (groupId, date) => ({
    type: EDIT_DATE_REQUEST,
    groupId,
    date
});

export const cancelEditingDate = () => ({
    type: CANCEL_EDITING_DATE
});
