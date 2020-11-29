import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SuccessModal from '../common/modal/SuccessModal';
import { StoreState } from '../types';
import materialStyles from '../materialStyles';
import StyledButton from '../common/StyledButton/StyledButton';
import styles from './MyGroups.module.scss';
import CreateGroup from './CreateGroup';
import { createGroupRequest } from './actions';

type Props = {
    createGroupRequest: (
        groupName: string,
        priceRange: number | number[] | null,
        date: Date | null,
        code: string) => void
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

    const [isCreatingGroup, setIsCreatingGroup] = React.useState(false);

    const closeCreatingGroup = () => setIsCreatingGroup(false);

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

    const triggerCreateGroupRequest = React.useCallback(() => {
        const priceRangeUsed = isPriceRangeActive ? priceRange : null;
        props.createGroupRequest(groupName, priceRangeUsed, selectedDate, groupCode);
        closeCreatingGroup();
        setIsPriceRangeActive(false);
        setPriceRange([0, 50]);
        setGroupName('');
        setGroupCode('');
    }, [isPriceRangeActive, priceRange, selectedDate, groupName, groupCode]);

    return (
        <>
            <Paper
                elevation={4}
                className={classes.paperNoPadding}
            >
                <div className={styles.myGroupsWrapper}>
                    My Groups
                </div>
                <div className={styles.buttonWrapper}>
                    <StyledButton
                        color="primary"
                        onClick={createGroup}
                        text="Create Group"
                    />
                    <StyledButton
                        color="secondary"
                        onClick={() => console.log('on join')}
                        text="Join Group"
                    />
                </div>
            </Paper>
            <SuccessModal
                backdrop
                closeModal={closeCreatingGroup}
                isOpen={isCreatingGroup}
                headerMessage="Create Group"
                toggleModal={closeCreatingGroup}
            >
                <CreateGroup
                    createGroupRequest={triggerCreateGroupRequest}

                    groupCode={groupCode}
                    setGroupCode={setGroupCode}

                    closeCreatingGroup={closeCreatingGroup}

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
        </>
    );
};

const mapDispatchToProps = {
    createGroupRequest
};

const mapStateToProps = (state: StoreState) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGroups);

export { MyGroups as MyGroupsUnconnected };
