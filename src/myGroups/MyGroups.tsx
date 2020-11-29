import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { firestoreConnect } from 'react-redux-firebase';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux';
import SuccessModal from '../common/modal/SuccessModal';
import { StoreState } from '../types';
import materialStyles from '../materialStyles';
import StyledButton from '../common/StyledButton/StyledButton';
import styles from './MyGroups.module.scss';
import CreateGroup from './CreateGroup';
import { createGroupRequest, joinGroupRequest } from './actions';
import Group from './Group';
import { GroupTypeKeyed } from './types';
import TextInput from '../common/TextInput/TextInput';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';

type Props = {
    auth: {
        uid: string;
    };
    creatingGroup: boolean;
    groups: GroupTypeKeyed;
    joiningGroup: boolean;
    joinGroupRequest: (code: string) => void;
    createGroupRequest: (
        groupName: string,
        priceRange: number | number[] | null,
        date: Date | null,
        code: string) => void,
}

const findNextChristmas = () => {
    const result = new Date();
    result.setDate(25);
    result.setMonth(11);
    if (result.getMonth() === 11 && result.getDate() > 25) {
        result.setFullYear(result.getFullYear() + 1);
    }
    return result;
};

const MyGroups: React.FC<Props> = (props: Props) => {
    const classes = makeStyles(materialStyles)();

    const [isJoiningGroup, setIsJoiningGroup] = React.useState<boolean>(false);
    const [isCreatingGroup, setIsCreatingGroup] = React.useState<boolean>(false);

    const [groupCodeToJoin, setGroupCodeToJoin] = React.useState<string>(
        ''
    );

    const createGroup = () => setIsCreatingGroup(true);

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        findNextChristmas()
    );

    const [priceRange, setPriceRange] = React.useState<number | number[]>(
        [0, 50]
    );

    const [groupName, setGroupName] = React.useState<string>(
        ''
    );

    const [groupCode, setGroupCode] = React.useState<string>(
        ''
    );

    const [isPriceRangeActive, setIsPriceRangeActive] = React.useState<boolean>(
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

    return (
        <>
            {groups.map(x => <Group {...x} />)}
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
                    <LoadingDiv isLoading={props.joiningGroup} isBorderRadius>
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

const mapDispatchToProps = {
    createGroupRequest,
    joinGroupRequest
};

const mapStateToProps = (state: StoreState) => ({
    auth: state.firebase.auth,
    creatingGroup: state.myGroups.creatingGroup,
    joiningGroup: state.myGroups.joiningGroup,
    groups: state.firestore.data.groups
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'groups',
            storeAs: 'groups'
        }
    ])
)(MyGroups);
