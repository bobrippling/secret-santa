import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { firestoreConnect } from 'react-redux-firebase';
import classNames from 'classnames';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Remove';
import FaceIcon from '@material-ui/icons/Face';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import StyledButton from '../common/StyledButton/StyledButton';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import SuccessModal from '../common/modal/SuccessModal';
import materialStyles from '../materialStyles';
import { GroupType, GiftRestrictions } from '../myGroups/types';
import { StoreState } from '../types';
import * as selectors from './selectors';
import styles from './GroupDetails.module.scss';
import { mapIdToName } from '../myGroups/helpers';
import AddToWishlist from './AddToWishlist';
import {
    addWishlistItemRequest, removeWishlistItemsRequest, addGiftRestrictionRequest,
    removeGiftRestrictionRequests, assignPairingsRequest, deleteGroupRequest
} from './actions';
import RemoveFromWishlist from './RemoveFromWishlist';
import * as constants from '../constants';
import AddGiftRestrictions from './AddGiftRestrictions';
import RemoveGiftRestrictions from './RemoveGiftRestrictions';
import TextInput from '../common/TextInput/TextInput';

type Props = {
    auth: {
        uid: string;
    },
    group: GroupType;
    addGiftRestrictionRequest: (groupId: string, group: string[]) => void;
    addingGiftRestriction: boolean;
    addingItemToWishlist: boolean;
    assignPairingsRequest: (groupId: string) => void;
    assigningPairings: boolean;
    deleteGroupRequest: (groupId: string) => void;
    deletingGroup: boolean;
    removingItemsFromWishlist: boolean;
    restrictions: GiftRestrictions;
    addWishlistItemRequest: (groupId: string, item: string, url: string) => void;
    removeWishlistItemsRequest: (groupId: string, items: string[]) => void;
    removeGiftRestrictionRequests: (groupId: string, restrictions: string[][]) => void;
    removingGiftRestrictions: boolean;
}

const MyGroups: React.FC<Props> = (props: Props) => {
    const classes = makeStyles(materialStyles)();

    const [isAddingToWishlist, setIsAddingToWishlist] = React.useState<boolean>(false);
    const [isRemovingFromWishlist, setIsRemovingFromWishlist] = React.useState<boolean>(false);

    const [isAddingGiftRestrictions, setIsAddingGiftRestrictions] = React.useState<boolean>(false);
    const [isRemovingGiftRestrictions,
        setIsRemovingGiftRestrictions] = React.useState<boolean>(false);

    const cancelRemovingFromWishlish = () => setIsRemovingFromWishlist(false);

    const [wishlistItemToAdd, setWishlistItemToAdd] = React.useState<string>('');
    const [wishlistItemToAddUrl, setWishlistItemToAddUrl] = React.useState<string>('');

    const [newGiftRestriction, setNewGiftRestriction] = React.useState<string[]>([]);
    const [removedGiftRestrictions, setRemovedGiftRestrictions] = React.useState<string[][]>([]);

    const [isConfirmDeleteGroup, setIsConfirmDeleteGroup] = React.useState<boolean>(false);
    const [confirmDeleteText, setConfirmDeleteText] = React.useState<string>('');

    const closeConfirmDeleteGroup = () => {
        setIsConfirmDeleteGroup(false);
        setConfirmDeleteText('');
    };

    const [isConfirmingAssignPairings,
        setIsConfirmingAssingPairings] = React.useState<boolean>(false);

    const closeAddingToWishlist = () => {
        setIsAddingToWishlist(false);
        setWishlistItemToAdd('');
        setWishlistItemToAddUrl('');
    };

    const onRemoveRestriction = (restriction: string[]) => {
        setRemovedGiftRestrictions([...removedGiftRestrictions, restriction]);
    };

    const cancelAddingGiftRestriction = () => setIsAddingGiftRestrictions(false);

    const addWishlistItem = React.useCallback(() => {
        props.addWishlistItemRequest(props.group?.id, wishlistItemToAdd, wishlistItemToAddUrl);
        closeAddingToWishlist();
    }, [wishlistItemToAdd, wishlistItemToAddUrl, props.group?.id]);

    const removeWishlistItems = (items: string[]) => {
        props.removeWishlistItemsRequest(props.group?.id, items);
        setIsRemovingFromWishlist(false);
    };

    const onGroupRestrictionClick = React.useCallback(id => {
        if (newGiftRestriction.includes(id)) {
            setNewGiftRestriction(newGiftRestriction.filter(x => x !== id));
        } else {
            setNewGiftRestriction([...newGiftRestriction, id]);
        }
    }, [newGiftRestriction]);

    // console.log('group', props.group);

    const addGiftRestriction = React.useCallback(() => {
        props.addGiftRestrictionRequest(props.group.id, newGiftRestriction);
        // setNewGiftRestriction([]);
        setIsAddingGiftRestrictions(false);
    }, [props.group, newGiftRestriction]);

    const cancelRemovingGiftRestrictions = () => {
        setIsRemovingGiftRestrictions(false);
        // setRemovedGiftRestrictions([]);
    };

    useEffect(() => {
        if (!props.addingGiftRestriction) {
            setNewGiftRestriction([]);
        }
    }, [props.addingGiftRestriction]);

    useEffect(() => {
        if (!props.removingGiftRestrictions) {
            setRemovedGiftRestrictions([]);
        }
    }, [props.removingGiftRestrictions]);

    const confirmRemoveRequest = () => {
        props.removeGiftRestrictionRequests(props.group.id, removedGiftRestrictions);
        cancelRemovingGiftRestrictions();
    };

    const confirmAssignPairings = () => {
        setIsConfirmingAssingPairings(false);
        props.assignPairingsRequest(props.group.id);
    };

    const { group } = props;

    console.log('Group', group);

    if (!group) {
        return null;
    }

    return (
        <>
            <Paper
                elevation={4}
                className={classes.paperNoPadding}
            >
                <div className={styles.detailWrapper}>
                    <div className={styles.key}>
                        Group Name
                    </div>
                    <div className={styles.value}>
                        {group.groupName}
                    </div>
                </div>

                {props.group.status === constants.groupStatuses.WAITING_FOR_PAIRINGS && (
                    <div className={styles.detailWrapperStatuses}>
                        <div className={styles.key}>
                            Who am I getting a gift for?
                        </div>
                        <div className={styles.waitForPairingsStatus}>
                            {`Waiting for ${mapIdToName(props.group.owner, props.group.displayNameMappings)} to randomise gift assignments`}
                        </div>
                    </div>
                )}
                {props.group.status === constants.groupStatuses.PAIRINGS_ASSIGNED && (
                    <div className={styles.detailWrapperStatuses}>
                        <div className={styles.key}>
                            Who am I getting a gift for?
                        </div>
                        <div className={styles.mySecretSantaTarget}>
                            {mapIdToName(props.group.pairings[props.auth.uid],
                                props.group.displayNameMappings)}
                        </div>
                    </div>
                )}

                {!group.isNoPriceRange && (
                    <div className={styles.detailWrapper}>
                        <div className={styles.key}>
                            Price Range
                        </div>
                        <div className={styles.value}>
                            {`£${group.priceMin} - £${group.priceMax}` }
                        </div>
                    </div>
                )}

                <div className={styles.detailWrapper}>
                    <div className={styles.key}>
                        Group Code
                    </div>
                    <div className={styles.value}>
                        {group.code}
                    </div>
                </div>

                <div className={styles.detailWrapper}>
                    <div className={styles.key}>
                        Manage Wishlist
                    </div>
                    <div className={styles.wishlistButtons}>
                        <div className={styles.addWishlistIcon}>
                            <AddCircleIcon color="primary" fontSize="large" onClick={() => setIsAddingToWishlist(true)} />
                        </div>
                        <div className={styles.removeWishlistIcon}>
                            <RemoveIcon color="secondary" fontSize="large" onClick={() => setIsRemovingFromWishlist(true)} />
                        </div>
                    </div>
                </div>

                {props.group.owner === props.auth.uid
                && props.group.status === constants.groupStatuses.WAITING_FOR_PAIRINGS && (
                    <div className={styles.detailWrapper}>
                        <div className={styles.key}>
                            Manage Gift Restrictions
                        </div>
                        <div className={styles.giftRestrictionButtons}>
                            <div className={styles.addGiftRestrictionIcon}>
                                <AddCircleIcon color="primary" fontSize="large" onClick={() => setIsAddingGiftRestrictions(true)} />
                            </div>
                            <div className={styles.removeGiftRestrictionIcon}>
                                <RemoveIcon color="secondary" fontSize="large" onClick={() => setIsRemovingGiftRestrictions(true)} />
                            </div>
                        </div>
                    </div>
                )}

                {((props.group.status === constants.groupStatuses.WAITING_FOR_PAIRINGS
                && props.auth.uid === props.group.owner) || true) && (
                    <div className={styles.activateGroupButton}>
                        <StyledButton
                            text="Assign Pairings"
                            onClick={() => setIsConfirmingAssingPairings(true)}
                        />
                    </div>
                )}

            </Paper>

            {group.participants.map((p, index: number) => (
                <Paper
                    elevation={4}
                    className={classes.paperNoPadding}
                    key={p}
                >
                    <div className={styles.participants}>
                        <div className={styles.faceIcon}>
                            <FaceIcon color={index % 2 === 0 ? 'primary' : 'secondary'} />
                        </div>
                        <div className={styles.participantName}>
                            {mapIdToName(p, group.displayNameMappings)}
                        </div>
                    </div>
                    <div className={styles.wishlistWrapper}>
                        <div className={styles.wishlistHeader}>
                            Wishlist
                        </div>
                        {props.group.wishlist[p].length === 0 && (
                            <div className={styles.noWishlistText}>
                                Nothing added yet
                            </div>
                        )}
                        <ul className={styles.wishlistBulletPoints}>
                            {props.group.wishlist[p].map(wishlistItem => (
                                <li key={wishlistItem.item}>
                                    {wishlistItem.url ? (
                                        <a target="_blank" rel="noopener noreferrer" href={wishlistItem.url}>{wishlistItem.item}</a>
                                    ) : wishlistItem.item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Paper>
            ))}

            <Paper
                elevation={4}
                className={classes.paperNoPadding}
            >
                <div className={styles.buttonWrapper}>
                    <LoadingDiv isLoading={props.removingGiftRestrictions} isBorderRadius>
                        {props.group.owner === props.auth.uid && (
                            <StyledButton
                                color="primary"
                                onClick={() => setIsConfirmDeleteGroup(true)}
                                text="Delete Group"
                            />
                        )}
                        <StyledButton
                            color="secondary"
                            onClick={props.cancelRemovingGiftRestrictions}
                            text="Leave group"
                        />
                    </LoadingDiv>
                </div>
            </Paper>

            <SuccessModal
                backdrop
                closeModal={() => setIsAddingToWishlist(false)}
                isOpen={isAddingToWishlist || props.addingItemToWishlist}
                headerMessage="Add Item to Wishlist"
                toggleModal={() => setIsAddingToWishlist(false)}
            >
                <AddToWishlist
                    addingItemToWishlist={props.addingItemToWishlist}
                    addWishlistItem={addWishlistItem}
                    closeAddingToWishlist={closeAddingToWishlist}
                    wishlistItemToAdd={wishlistItemToAdd}
                    setWishlistItemToAdd={setWishlistItemToAdd}
                    wishlistItemToAddUrl={wishlistItemToAddUrl}
                    setWishlistItemToAddUrl={setWishlistItemToAddUrl}
                />
            </SuccessModal>

            <SuccessModal
                backdrop
                closeModal={cancelRemovingFromWishlish}
                isOpen={isRemovingFromWishlist || props.removingItemsFromWishlist}
                headerMessage="Remove items"
                toggleModal={cancelRemovingFromWishlish}
            >
                <RemoveFromWishlist
                    cancelRemovingFromWishlish={cancelRemovingFromWishlish}
                    initialWishlistItems={props.group.wishlist[props.auth.uid].map(x => x.item)}
                    removeWishlistItems={removeWishlistItems}
                    removingItemsFromWishlist={props.removingItemsFromWishlist}
                />
            </SuccessModal>

            <SuccessModal
                backdrop
                closeModal={cancelAddingGiftRestriction}
                isOpen={isAddingGiftRestrictions || props.addingGiftRestriction}
                headerMessage="Add Gift Restrictions"
                toggleModal={cancelAddingGiftRestriction}
            >
                <AddGiftRestrictions
                    addGiftRestriction={addGiftRestriction}
                    addingGiftRestriction={props.addingGiftRestriction}
                    cancelAddingGiftRestriction={cancelAddingGiftRestriction}
                    displayNameMappings={group.displayNameMappings}
                    newGiftRestriction={newGiftRestriction}
                    onClick={onGroupRestrictionClick}
                    participants={group.participants}
                />
            </SuccessModal>

            <SuccessModal
                backdrop
                closeModal={cancelRemovingGiftRestrictions}
                isOpen={isRemovingGiftRestrictions || props.removingGiftRestrictions}
                headerMessage="Remove Gift Restrictions"
                toggleModal={cancelRemovingGiftRestrictions}
            >
                <RemoveGiftRestrictions
                    cancelRemovingGiftRestrictions={cancelRemovingGiftRestrictions}
                    confirmRemoveRequest={confirmRemoveRequest}
                    displayNameMappings={group.displayNameMappings}
                    giftRestrictions={props.group.restrictions}
                    onRemoveRestriction={onRemoveRestriction}
                    removedGiftRestrictions={removedGiftRestrictions}
                    removingGiftRestrictions={props.removingGiftRestrictions}
                />
            </SuccessModal>

            <SuccessModal
                backdrop
                closeModal={() => setIsConfirmingAssingPairings(false)}
                isOpen={isConfirmingAssignPairings || props.assigningPairings}
                headerMessage="Confirm Assign Pairings"
                toggleModal={() => setIsConfirmingAssingPairings(false)}
            >
                <div className={styles.confirmMessage}>
                    Once you confirm pairings, nobody else will be able to join the group!
                </div>

                <div className={styles.detailWrapperStatuses}>
                    <div className={styles.key}>
                        Group Members
                    </div>
                    <div className={classNames({
                        [styles.waitForPairingsStatus]: true,
                        [styles.scrollYConfirm]: props.group.participants.length > 15
                    })}
                    >
                        {props.group.participants.map(p => (
                            <div>
                                {mapIdToName(p, props.group.displayNameMappings)}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <LoadingDiv isLoading={props.assigningPairings} isBorderRadius>
                        <StyledButton
                            color="primary"
                            onClick={confirmAssignPairings}
                            text="Confirm"
                            disabled={props.assigningPairings}
                        />
                        <StyledButton
                            color="secondary"
                            onClick={() => setIsConfirmingAssingPairings(false)}
                            text="Cancel"
                            disabled={props.assigningPairings}
                        />
                    </LoadingDiv>
                </div>

            </SuccessModal>

            <SuccessModal
                backdrop
                closeModal={closeConfirmDeleteGroup}
                isOpen={isConfirmDeleteGroup || props.deletingGroup}
                headerMessage="Confirm Delete Group"
                toggleModal={closeConfirmDeleteGroup}
            >
                <div className={styles.confirmDeleteMessage}>
                    Are you sure you want to delete the group? It cannot be undone.
                </div>
                <div>
                    <TextInput
                        value={confirmDeleteText}
                        onChange={setConfirmDeleteText}
                        label="Type delete to confirm"
                    />
                </div>

                <div className={styles.buttonWrapper}>
                    <LoadingDiv isLoading={props.deletingGroup} isBorderRadius>
                        <StyledButton
                            color="primary"
                            onClick={() => props.deleteGroupRequest(props.group.id)}
                            text="Confirm Delete"
                            disabled={confirmDeleteText.toLowerCase() !== 'delete' || props.deletingGroup}
                        />
                        <StyledButton
                            color="secondary"
                            onClick={closeConfirmDeleteGroup}
                            text="Cancel"
                            disabled={props.deletingGroup}
                        />
                    </LoadingDiv>
                </div>

            </SuccessModal>

        </>
    );
};

const mapDispatchToProps = {
    addWishlistItemRequest,
    addGiftRestrictionRequest,
    assignPairingsRequest,
    deleteGroupRequest,
    removeWishlistItemsRequest,
    removeGiftRestrictionRequests
};

const mapStateToProps = (state: StoreState, props: any) => ({
    addingItemToWishlist: state.groupDetails.addingItemToWishlist,
    addingGiftRestriction: state.groupDetails.addingGiftRestriction,
    assigningPairings: state.groupDetails.assigningPairings,
    auth: state.firebase.auth,
    deletingGroup: state.groupDetails.deletingGroup,
    group: selectors.getGroupFromId(state, props),
    removingItemsFromWishlist: state.groupDetails.removingItemsFromWishlist,
    removingGiftRestrictions: state.groupDetails.removingGiftRestrictions
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
