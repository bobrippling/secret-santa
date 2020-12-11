import { functionToCall } from '../api/api';

export const addItemToWishlist = request => functionToCall('wishlist-addItem')(request);
export const removeItems = request => functionToCall('wishlist-removeItems')(request);
export const addGiftRestriction = request => functionToCall('groups-addGiftRestriction')(request);
export const removeGiftRestrictions = request => functionToCall('groups-removeGiftRestrictions')(request);
export const assignPairings = request => functionToCall('groups-assignPairings')(request);
export const deleteGroup = request => functionToCall('groups-deleteGroup')(request);
export const leaveGroup = request => functionToCall('groups-leaveGroup')(request);
export const setAddress = request => functionToCall('groups-setAddress')(request);
export const kickUser = request => functionToCall('groups-kickUser')(request);
export const regenerateGroup = request => functionToCall('groups-regenerateGroup')(request);
