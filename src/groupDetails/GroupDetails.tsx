import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { firestoreConnect } from 'react-redux-firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Remove';
import FaceIcon from '@material-ui/icons/Face';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SuccessModal from '../common/modal/SuccessModal';
import materialStyles from '../materialStyles';
import { GroupType } from '../myGroups/types';
import { StoreState } from '../types';
import * as selectors from './selectors';
import styles from './GroupDetails.module.scss';
import { mapIdToName } from '../myGroups/helpers';
import AddToWishlist from './AddToWishlist';
import { addWishlistItemRequest, removeWishlistItemsRequest } from './actions';
import RemoveFromWishlist from './RemoveFromWishlist';
import * as constants from '../constants';
import ManageGiftRestrictions from './ManageGiftRestrictions';

type Props = {
    auth: {
        uid: string;
    },
    group: GroupType;
    addingItemToWishlist: boolean;
    removingItemsFromWishlist: boolean;
    addWishlistItemRequest: (groupId: string, item: string, url: string) => void;
    removeWishlistItemsRequest: (groupId: string, items: string[]) => void;
}

const MyGroups: React.FC<Props> = (props: Props) => {
    const classes = makeStyles(materialStyles)();

    const [isAddingToWishlist, setIsAddingToWishlist] = React.useState<boolean>(false);
    const [isRemovingFromWishlist, setIsRemovingFromWishlist] = React.useState<boolean>(false);

    const [isAddingToGiftRestrictions,
        setIsAddingToGiftRestrictions] = React.useState<boolean>(false);

    const cancelRemovingFromWishlish = () => setIsRemovingFromWishlist(false);

    const [wishlistItemToAdd, setWishlistItemToAdd] = React.useState<string>('');
    const [wishlistItemToAddUrl, setWishlistItemToAddUrl] = React.useState<string>('');

    const closeAddingToWishlist = () => {
        setIsAddingToWishlist(false);
        setWishlistItemToAdd('');
        setWishlistItemToAddUrl('');
    };

    const addWishlistItem = React.useCallback(() => {
        props.addWishlistItemRequest(props.group?.id, wishlistItemToAdd, wishlistItemToAddUrl);
        closeAddingToWishlist();
    }, [wishlistItemToAdd, wishlistItemToAddUrl, props.group?.id]);

    const removeWishlistItems = (items: string[]) => {
        props.removeWishlistItemsRequest(props.group?.id, items);
        setIsRemovingFromWishlist(false);
    };

    const { group } = props;

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

                {props.group.owner === props.auth.uid && (
                    <div className={styles.detailWrapper}>
                        <div className={styles.key}>
                            Manage Gift Restrictions
                        </div>
                        <div className={styles.giftRestrictionButtons}>
                            <div className={styles.manageGiftRestrictions}>
                                <EditIcon color="primary" fontSize="large" onClick={() => setIsAddingToGiftRestrictions(true)} />
                            </div>
                        </div>
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
                                {`${mapIdToName(p, group.displayNameMappings)} has nothing in their wishlist yet`}
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
                closeModal={() => setIsRemovingFromWishlist(false)}
                isOpen={isRemovingFromWishlist || props.removingItemsFromWishlist}
                headerMessage="Remove items"
                toggleModal={() => setIsRemovingFromWishlist(false)}
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
                closeModal={() => setIsAddingToGiftRestrictions(false)}
                isOpen={isAddingToGiftRestrictions}
                headerMessage="Add Gift Restrictions"
                toggleModal={() => setIsAddingToGiftRestrictions(false)}
            >
                <ManageGiftRestrictions />
            </SuccessModal>

        </>
    );
};

const mapDispatchToProps = {
    addWishlistItemRequest,
    removeWishlistItemsRequest
};

const mapStateToProps = (state: StoreState, props: any) => ({
    addingItemToWishlist: state.groupDetails.addingItemToWishlist,
    auth: state.firebase.auth,
    group: selectors.getGroupFromId(state, props),
    removingItemsFromWishlist: state.groupDetails.removingItemsFromWishlist
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
