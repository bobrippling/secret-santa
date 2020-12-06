import React from 'react';
import _ from 'lodash';
import CancelIcon from '@material-ui/icons/Cancel';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import StyledButton from '../common/StyledButton/StyledButton';
import styles from './RemoveFromWishlist.module.scss';

const RemoveFromWishlist = props => {
    const [removedItems, setRemovedItems] = React.useState([]);

    const removeItem = React.useCallback(item => {
        setRemovedItems(_.uniq([...removedItems, item]));
    }, [removedItems]);

    const removeItems = React.useCallback(() => {
        props.removeWishlistItems(removedItems);
        setRemovedItems([]);
    }, [removedItems]);

    return (
        <>
            <div className={styles.removeWrapper}>
                {props.initialWishlistItems.filter(x => !removedItems.includes(x)).map(item => (
                    <div className={styles.removeWishlistItemWrapper}>
                        <div className={styles.wishlistItem}>
                            {item}
                        </div>
                        <div className={styles.removeIcon}>
                            <CancelIcon color="secondary" onClick={() => removeItem(item)} />
                        </div>
                    </div>
                ))}
            </div>
            {props.initialWishlistItems.length === 0 && (
                <div className={styles.noWishlistItems}>
                    You have no wishlist items to remove
                </div>
            )}
            {props.initialWishlistItems.length === removedItems.length
                && removedItems.length > 0 && (
                <div className={styles.noWishlistItems}>
                    You have no more wishlist items to remove
                </div>
            )}
            <div className={styles.buttonWrapper}>
                <LoadingDiv isLoading={props.removingItemsFromWishlist} isBorderRadius>
                    <StyledButton
                        color="primary"
                        onClick={removeItems}
                        text="Remove"
                        disabled={removedItems.length === 0 || props.removingItemsFromWishlist}
                    />
                    <StyledButton
                        color="secondary"
                        onClick={props.cancelRemovingFromWishlish}
                        text="Cancel"
                        disabled={props.removingItemsFromWishlist}
                    />
                </LoadingDiv>
            </div>
        </>
    );
};

export default RemoveFromWishlist;
