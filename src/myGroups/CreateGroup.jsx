import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as textInputConstants from '../common/TextInput/constants';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import Fade from '../common/Fade/Fade';
import DatePicker from '../common/datePicker/DatePicker';
import RangeSlider from '../common/slider/RangeSlider';
import styles from './CreateGroup.module.scss';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import * as appConstants from '../constants';

const MyGroups = props => {
    const a = {

    };

    console.log('a', a.b.c.d);

    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    return (
        <div>
            <div className={classNames({
                [styles.smallWidth]: !isMobile
            })}
            >
                <TextInput
                    icon={textInputConstants.textInputIcons.face}
                    iconColor="primary"
                    value={props.groupName}
                    onChange={props.setGroupName}
                    label="Group name"
                />
                <TextInput
                    icon={textInputConstants.textInputIcons.lock}
                    iconColor="primary"
                    value={props.groupCode}
                    onChange={props.setGroupCode}
                    helperText="Must be at least 6 characters"
                    minLength={6}
                    hasValidation
                    label="Code"
                />
            </div>
            {!props.isPriceRangeActive ? (
                <div
                    className={styles.priceRangeToggle}
                    onClick={() => props.setIsPriceRangeActive(true)}
                    role="button"
                    tabIndex={0}
                >
                    <div className={styles.iconWrapper}>
                        <AddIcon color="primary" />
                    </div>
                    <div className={styles.addPriceRange}>Add Price Range</div>
                </div>
            ) : (
                <div
                    className={styles.priceRangeToggle}
                    onClick={() => props.setIsPriceRangeActive(false)}
                    role="button"
                    tabIndex={0}
                >
                    <div className={styles.iconWrapper}>
                        <RemoveIcon color="secondary" />
                    </div>
                    <div className={styles.addPriceRange}>Remove Price Range</div>
                </div>
            )}

            <Fade checked={props.isPriceRangeActive}>
                <div className={styles.sliderWrapper}>
                    <RangeSlider
                        priceRange={props.priceRange}
                        setPriceRange={props.setPriceRange}
                        min={0}
                        max={50}
                    />
                </div>
            </Fade>
            <DatePicker
                label="Event Date"
                selectedDate={props.selectedDate}
                minDate={new Date()}
                setSelectedDate={props.setSelectedDate}
                variant="inline"
            />
            <div className={styles.buttonWrapper}>
                <LoadingDiv isLoading={props.creatingGroup} isBorderRadius>
                    <StyledButton
                        color="primary"
                        onClick={props.createGroupRequest}
                        text="Create"
                        disabled={!props.groupName || !props.groupCode || props.groupCode.length < 6
                        || props.creatingGroup}
                    />
                    <StyledButton
                        color="secondary"
                        onClick={props.closeCreatingGroup}
                        text="Cancel"
                        disabled={props.creatingGroup}
                    />
                </LoadingDiv>
            </div>
        </div>
    );
};

export default MyGroups;
