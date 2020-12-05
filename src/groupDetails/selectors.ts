import fp from 'lodash/fp';
import { StoreState } from '../types';

export const getGroupFromId = (state: StoreState, props: any) => {
    const { groups } = state.firestore.data;

    const groupId = fp.flow(
        fp.get('match'),
        fp.get('params'),
        fp.get('groupId')
    )(props);

    if (!groups) {
        return null;
    }

    const result = groups[groupId];

    if (!result) {
        return null;
    }

    return {
        ...result,
        id: groupId
    };
};
