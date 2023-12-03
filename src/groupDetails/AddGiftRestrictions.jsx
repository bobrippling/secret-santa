import React from 'react';
import classNames from 'classnames';
import StyledButton from '../common/StyledButton/StyledButton';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import { mapIdToName } from '../myGroups/helpers';
import Checkbox from '../common/Checkbox/Checkbox';
import styles from './AddGiftRestrictions.module.scss';

const AddGiftRestrictions = props => {
    const generateCheckboxRow = (p, onAddPerson, displayNameMappings) => (
        <div className={styles.participantRow} key={p}>
            <div>
                <Checkbox
                    checked={props.newGiftRestriction.people.includes(p)}
                    onClick={() => onAddPerson(p)}
                />
            </div>
            <div
                className={classNames({
                    [styles.participantName]: true,
                    [styles.makeBold]: props.newGiftRestriction.people.includes(p)
                })}
                onClick={() => onAddPerson(p)}
                role="button"
                tabIndex={0}
            >
                {mapIdToName(p, displayNameMappings)}
            </div>
        </div>
    );

    return (
        <>
            <div className={styles.instructionsMessage}>
                    Anybody in the same group will not be able to send or receive a gift from each other
            </div>
            <div className={styles.scrollableWrapper}>
                <div className={styles.checkboxWrapper}>
                    <div>
                        {props.participants.filter((x, index) => index % 3 === 0).map(p => (
                            generateCheckboxRow(p, props.onAddPerson, props.displayNameMappings)
                        ))}
                    </div>
                    <div>
                        {props.participants.filter((x, index) => index % 3 === 1).map(p => (
                            generateCheckboxRow(p, props.onAddPerson, props.displayNameMappings)
                        ))}
                    </div>
                    <div>
                        {props.participants.filter((x, index) => index % 3 === 2).map(p => (
                            generateCheckboxRow(p, props.onAddPerson, props.displayNameMappings)
                        ))}
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <LoadingDiv isLoading={props.addingGiftRestriction} isBorderRadius>
                        <StyledButton
                            color="primary"
                            onClick={props.addGiftRestriction}
                            text="Add Group"
                            disabled={props.newGiftRestriction.people.length < 2
                                || props.addingGiftRestriction}
                        />
                        <StyledButton
                            color="secondary"
                            onClick={props.cancelAddingGiftRestriction}
                            text="Cancel"
                            disabled={props.addingGiftRestriction}
                        />
                        <Checkbox
                            checked={props.newGiftRestriction.isOneWay}
                            onClick={props.onToggleIsOneWay}
                        />
                    </LoadingDiv>
                </div>
            </div>
        </>
    );
};

export default AddGiftRestrictions;
