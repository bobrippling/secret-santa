import React from 'react';
import StyledButton from '../common/StyledButton/StyledButton';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import { mapIdToName } from '../myGroups/helpers';
import Checkbox from '../common/Checkbox/Checkbox';
import styles from './AddGiftRestrictions.module.scss';
import { DisplayNameMappings } from '../myGroups/types';

type Props = {
    addGiftRestriction: () => void;
    addingGiftRestriction: boolean;
    cancelAddingGiftRestriction: () => void;
    displayNameMappings: DisplayNameMappings;
    newGiftRestriction: string[];
    onClick: (id: string) => void;
    participants: string[];
}

const AddGiftRestrictions: React.FC<Props> = (props: Props) => (
    <div>
        <div className={styles.instructionsMessage}>
            Anybody in the same group will not be able to send or receive a gift from each other
        </div>
        <div>
            {props.participants.map(p => (
                <div className={styles.participantRow}>
                    <div>
                        <Checkbox
                            checked={props.newGiftRestriction.includes(p)}
                            onClick={() => props.onClick(p)}
                        />
                    </div>
                    <div className={styles.participantName}>
                        {mapIdToName(p, props.displayNameMappings)}
                    </div>
                </div>
            ))}
        </div>
        <div className={styles.buttonWrapper}>
            <LoadingDiv isLoading={props.addingGiftRestriction} isBorderRadius>
                <StyledButton
                    color="primary"
                    onClick={props.addGiftRestriction}
                    text="Add Group"
                    disabled={props.newGiftRestriction.length < 2 || props.addingGiftRestriction}
                />
                <StyledButton
                    color="secondary"
                    onClick={props.cancelAddingGiftRestriction}
                    text="Cancel"
                    disabled={props.addingGiftRestriction}
                />
            </LoadingDiv>
        </div>
    </div>
);

export default AddGiftRestrictions;
