import React from 'react';
import { connect } from 'react-redux';
import _, { noop } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import SuccessModal from '../common/modal/SuccessModal';
import materialStyles from '../materialStyles';
import StyledButton from '../common/StyledButton/StyledButton';
import styles from './MyGroups.module.scss';
import CreateGroup from './CreateGroup';
import { createGroupRequest, joinGroupRequest } from './actions';
import Group from './Group';
import TextInput from '../common/TextInput/TextInput';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import * as constants from '../constants';

const findNextChristmas = () => {
    const result = new Date();
    result.setDate(25);
    result.setMonth(11);
    if (result.getMonth() === 11 && result.getDate() > 25) {
        result.setFullYear(result.getFullYear() + 1);
    }
    return result;
};

const MyGroups = props => {
    const classes = makeStyles(materialStyles)();

    const [isJoiningGroup, setIsJoiningGroup] = React.useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = React.useState(false);

    const [groupCodeToJoin, setGroupCodeToJoin] = React.useState(
        ''
    );

    const createGroup = () => setIsCreatingGroup(true);

    const [selectedDate, setSelectedDate] = React.useState(
        findNextChristmas()
    );

    const [priceRange, setPriceRange] = React.useState(
        [0, 50]
    );

    const [groupName, setGroupName] = React.useState(
        ''
    );

    const [groupCode, setGroupCode] = React.useState(
        ''
    );

    const [isPriceRangeActive, setIsPriceRangeActive] = React.useState(
        false
    );

    const resetState = () => {
        setIsCreatingGroup(false);
        setIsJoiningGroup(false);
        setGroupCodeToJoin('');
        setSelectedDate(findNextChristmas());
        setPriceRange([0, 50]);
        setGroupName('');
        setGroupCode('');
        setIsPriceRangeActive(false);
    };

    const triggerCreateGroupRequest = React.useCallback(() => {
        const priceRangeUsed = isPriceRangeActive ? priceRange : null;
        props.createGroupRequest(groupName, priceRangeUsed, selectedDate, groupCode);
        resetState();
    }, [isPriceRangeActive, priceRange, selectedDate, groupName, groupCode]);

    const groups = _.map(props.groups, (value, id) => ({ id, ...value }))
        .filter(x => x.participants.includes(props.auth.uid));

    const joinGroup = React.useCallback(() => {
        props.joinGroupRequest(groupCodeToJoin);
        setIsJoiningGroup(false);
        resetState();
    }, [groupCodeToJoin]);

    const redirectToGroupDetails = groupId => {
        props.history.push(`${constants.URL.GROUP_DETAILS}/${groupId}`);
    };

    return (
        <>
            {groups.map(x => {
                const propsToPass = {
                    ...x,
                    redirectToGroupDetails,
                    key: x.id
                };
                return <Group {...propsToPass} />;
            })}
            <Paper
                elevation={4}
                className={classes.paperNoPadding}
            >
                <div className={styles.buttonWrapper}>
                    <StyledButton
                        color="primary"
                        onClick={createGroup}
                        text="Create Group"
                    />
                    <StyledButton
                        color="secondary"
                        onClick={() => setIsJoiningGroup(true)}
                        text="Join Group"
                    />
                </div>
            </Paper>
            <SuccessModal
                backdrop
                closeModal={resetState}
                isOpen={isCreatingGroup || props.creatingGroup}
                headerMessage="Create Group"
                toggleModal={resetState}
            >
                <CreateGroup
                    creatingGroup={props.creatingGroup}
                    createGroupRequest={triggerCreateGroupRequest}
                    groupCode={groupCode}
                    setGroupCode={setGroupCode}
                    closeCreatingGroup={resetState}
                    isPriceRangeActive={isPriceRangeActive}
                    setIsPriceRangeActive={setIsPriceRangeActive}
                    groupName={groupName}
                    setGroupName={setGroupName}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </SuccessModal>

            <SuccessModal
                backdrop
                closeModal={resetState}
                isOpen={isJoiningGroup || props.joiningGroup}
                headerMessage="Join Group"
                toggleModal={resetState}
            >
                <TextInput
                    value={groupCodeToJoin}
                    onChange={setGroupCodeToJoin}
                    label="Enter code"
                />
                <div className={styles.buttonWrapper}>
                    <LoadingDiv isLoading={props.joiningGroup} isBorderRadius isFitContent>
                        <StyledButton
                            color="primary"
                            onClick={joinGroup}
                            text="Join"
                            disabled={!groupCodeToJoin || groupCodeToJoin.length < 6
                                || props.joiningGroup}
                        />
                        <StyledButton
                            color="secondary"
                            onClick={resetState}
                            text="Cancel"
                        />
                    </LoadingDiv>
                </div>
            </SuccessModal>
        </>
    );
};

MyGroups.defaultProps = {
    auth: {
        uid: ''
    },
    createGroupRequest: noop,
    creatingGroup: false,
    joinGroupRequest: noop,
    joiningGroup: false,
    groups: {}
};

MyGroups.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    createGroupRequest: PropTypes.func,
    creatingGroup: PropTypes.bool,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    joinGroupRequest: PropTypes.func,
    joiningGroup: PropTypes.bool,
    groups: PropTypes.shape({})
};

const mapDispatchToProps = {
    createGroupRequest,
    joinGroupRequest
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    creatingGroup: state.myGroups.creatingGroup,
    joiningGroup: state.myGroups.joiningGroup,
    groups: state.firestore.data.groups
});

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'groups',
            storeAs: 'groups'
        }
    ])
)(MyGroups));
