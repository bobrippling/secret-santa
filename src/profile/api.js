import { functionToCall } from '../api/api';

export const linkFacebookAccount = request => functionToCall('profile-linkFacebookAccount')(request);
