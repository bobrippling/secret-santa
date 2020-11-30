import { functionToCall } from '../api/api';

export const addItemToWishlist = request => functionToCall('wishlist-addItem')(request);
export const removeItems = request => functionToCall('wishlist-removeItems')(request);
