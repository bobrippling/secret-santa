import { functionToCall } from '../api/api';

export const addItemToWishlist = request => functionToCall('wishlist-addItem')(request);
