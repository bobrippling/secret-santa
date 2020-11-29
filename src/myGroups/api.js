import { functionToCall } from '../api/api';

export const createGroup = request => functionToCall('groups-createGroup')(request);
export const joinGroup = request => functionToCall('groups-joinGroup')(request);
