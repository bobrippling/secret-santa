import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { firestoreConnect } from 'react-redux-firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FaceIcon from '@material-ui/icons/Face';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import SuccessModal from '../common/modal/SuccessModal';
import materialStyles from '../materialStyles';
import { GroupType } from '../myGroups/types';
import { StoreState } from '../types';
import * as selectors from './selectors';
import styles from './GroupDetails.module.scss';
import { mapIdToName } from '../myGroups/helpers';
import AddToWishlist from './AddToWishlist';
import { addWishlistItemRequest } from './actions';

type Props = {
    auth: {
        uid: string;
    },
    group: GroupType;
    addingItemToWishlist: boolean;
    addWishlistItemRequest: (groupId: string, item: string, url: string) => void;
}

const MyGroups: React.FC<Props> = (props: Props) => {
    const classes = makeStyles(materialStyles)();

    const [isAddingToWishlist, setIsAddingToWishlist] = React.useState<boolean>(false);

    const [wishlistItemToAdd, setWishlistItemToAdd] = React.useState<string>('');
    const [wishlistItemToAddUrl, setWishlistItemToAddUrl] = React.useState<string>('');

    const closeAddingToWishlist = () => {
        setIsAddingToWishlist(false);
        setWishlistItemToAdd('');
        setWishlistItemToAddUrl('');
    };

    const addWishlistItem = React.useCallback(() => {
        props.addWishlistItemRequest(props.group.id, wishlistItemToAdd, wishlistItemToAddUrl);
        closeAddingToWishlist();
    }, [wishlistItemToAdd, wishlistItemToAddUrl, props.group?.id]);

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

                <div
                    className={styles.addToWishlistIconWrapper}
                    onClick={() => setIsAddingToWishlist(true)}
                    role="button"
                    tabIndex={0}
                >
                    <div className={styles.addWishlistIcon}>
                        <AddCircleIcon color="primary" fontSize="large" />
                    </div>
                    <div className={styles.addWishlistText}>
                        Add item to wishlist
                    </div>
                </div>
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

        </>
    );
};

const mapDispatchToProps = {
    addWishlistItemRequest
};

const mapStateToProps = (state: StoreState, props: any) => ({
    addingItemToWishlist: state.groupDetails.addingItemToWishlist,
    auth: state.firebase.auth,
    group: selectors.getGroupFromId(state, props)
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
