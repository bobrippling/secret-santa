import React from 'react';
import _ from 'lodash';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import { mapIdToName } from '../myGroups/helpers';
import { GiftRestrictions, DisplayNameMappings } from '../myGroups/types';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import StyledButton from '../common/StyledButton/StyledButton';
import styles from './RemoveGiftRestrictions.module.scss';

type Props = {
    cancelRemovingGiftRestrictions: () => void;
    confirmRemoveRequest: () => void;
    displayNameMappings: DisplayNameMappings;
    giftRestrictions: GiftRestrictions;
    onRemoveRestriction: (restriction: string[]) => void;
    removedGiftRestrictions: string[][];
    removingGiftRestrictions: boolean;
}

const doArraysContainSameElements = (arr: string[],
    arrTwo: string[]): boolean => _.xor(arr, arrTwo).length === 0;

const getRemainingRestrictions = (giftRestrictions: GiftRestrictions,
    removedRestrictions: string[][]): string[][] => Object.values(giftRestrictions)
    .filter(x => !removedRestrictions.some(y => doArraysContainSameElements(x, y)));

const RemoveGiftRestrictions: React.FC<Props> = (props: Props) => {
    const remainingResults = getRemainingRestrictions(props.giftRestrictions,
        props.removedGiftRestrictions);
    return (
        <>
            <div className={styles.removeGiftRestrictionNamesWrapper}>
                {Object.keys(props.giftRestrictions).length === 0 && (
                    <div className={styles.noGiftRestrictionsToRemove}>
                        There are no gift restrictions to remove
                    </div>
                )}
                {remainingResults.length === 0 && props.removedGiftRestrictions.length > 0 && (
                    <div className={styles.noGiftRestrictionsToRemove}>
                        There are no more gift restrictions to remove
                    </div>
                )}
                {remainingResults.map((x, index) => (
                    <div className={styles.rowWrapper} key={x.toString()}>
                        <div
                            className={classNames({
                                [styles.removeGiftRestrictionRow]: true,
                                [styles[`color-${index % 4}`]]: true
                            })}
                        >
                            {x.map(name => mapIdToName(name, props.displayNameMappings)).join(', ')}
                        </div>
                        <div className={styles.removeButton}>
                            <CancelIcon
                                fontSize="large"
                                color="secondary"
                                onClick={() => props.onRemoveRestriction(x)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttonWrapper}>
                <LoadingDiv isLoading={props.removingGiftRestrictions} isBorderRadius>
                    <StyledButton
                        color="primary"
                        onClick={props.confirmRemoveRequest}
                        text="Remove"
                        disabled={props.removedGiftRestrictions.length === 0
                        || props.removingGiftRestrictions}
                    />
                    <StyledButton
                        color="secondary"
                        onClick={props.cancelRemovingGiftRestrictions}
                        text="Cancel"
                        disabled={props.removingGiftRestrictions}
                    />
                </LoadingDiv>
            </div>
        </>
    );
};

export default RemoveGiftRestrictions;
