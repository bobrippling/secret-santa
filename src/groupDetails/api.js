import { functionToCall } from '../api/api';

export const addItemToWishlist = request => functionToCall('wishlist-addItem')(request);
export const removeItems = request => functionToCall('wishlist-removeItems')(request);
export const addGiftRestriction = request => functionToCall('groups-addGiftRestriction')(request);
export const removeGiftRestrictions = request => functionToCall('groups-removeGiftRestrictions')(request);
