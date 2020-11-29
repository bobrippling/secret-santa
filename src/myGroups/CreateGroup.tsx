import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as textInputConstants from '../common/TextInput/constants';
import StyledButton from '../common/StyledButton/StyledButton';
import TextInput from '../common/TextInput/TextInput';
import Fade from '../common/Fade/Fade';
import DatePicker from '../common/datePicker/DatePicker';
import RangeSlider from '../common/slider/RangeSlider';
import styles from './CreateGroup.module.scss';

type Props = {

    groupCode: string;
    setGroupCode: (code: string) => void;

    createGroupRequest: () => void;

    closeCreatingGroup: () => void;

    isPriceRangeActive: boolean;
    setIsPriceRangeActive: (isActive: boolean) => void;

    groupName: string;
    setGroupName: (name:string) => void;

    priceRange: number | number[];
    setPriceRange: (range: number | number[]) => void;

    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}

const MyGroups: React.FC<Props> = (props: Props) => (
    <div>
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
            label="Code"
            minLength={6}
            hasValidation
        />
        {!props.isPriceRangeActive ? (
            <div className={styles.priceRangeToggle}>
                <div className={styles.iconWrapper}>
                    <AddIcon color="primary" onClick={() => props.setIsPriceRangeActive(true)} />
                </div>
                <div className={styles.addPriceRange}>Add Price Range</div>
            </div>
        ) : (
            <div className={styles.priceRangeToggle}>
                <div className={styles.iconWrapper}>
                    <RemoveIcon color="secondary" onClick={() => props.setIsPriceRangeActive(false)} />
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
            setSelectedDate={props.setSelectedDate}
            variant="inline"
        />
        <div className={styles.buttonWrapper}>
            <StyledButton
                color="primary"
                onClick={props.createGroupRequest}
                text="Create"
                disabled={!props.groupName || !props.groupCode || props.groupCode.length < 6}
            />
            <StyledButton
                color="secondary"
                onClick={props.closeCreatingGroup}
                text="Cancel"
            />
        </div>
    </div>
);

export default MyGroups;
