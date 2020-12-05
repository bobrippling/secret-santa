import { functionToCall } from '../api/api';

export const linkFacebookAccount = request => functionToCall('profile-linkFacebookAccount')(request);
export const updateDisplayName = request => functionToCall('profile-updateDisplayName')(request);
export const deleteAccount = request => functionToCall('profile-deleteAccount')(request);
