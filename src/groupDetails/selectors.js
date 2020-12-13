import fp from 'lodash/fp';

export const getGroupFromId = (state, props) => {
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

export const hasFetchedGroups = state => {
    const { firestore } = state;

    return !fp.isEmpty(firestore.data);
};
