import { functionToCall } from '../api/api';

export const createGroup = request => functionToCall('groups-createGroup')(request);
