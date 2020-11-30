import React from 'react';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import StyledButton from '../common/StyledButton/StyledButton';
import styles from './AddToWishlist.module.scss';

type Props = {
    wishlistItemToAdd: string;
    setWishlistItemToAdd: (item: string) => void;

    wishlistItemToAddUrl: string;
    setWishlistItemToAddUrl: (item: string) => void;

    closeAddingToWishlist: () => void;
    addWishlistItem: () => void;

    addingItemToWishlist: boolean;
}

const AddToWishlist: React.FC<Props> = (props: Props) => (
    <div>
        <TextInput
            icon={textInputConstants.textInputIcons.present}
            iconColor="primary"
            value={props.wishlistItemToAdd}
            onChange={props.setWishlistItemToAdd}
            label="Wishlist item"
        />

        <TextInput
            icon={textInputConstants.textInputIcons.link}
            iconColor="primary"
            value={props.wishlistItemToAddUrl}
            onChange={props.setWishlistItemToAddUrl}
            label="Link (optional)"
        />

        <div className={styles.buttonWrapper}>
            <LoadingDiv isLoading={props.addingItemToWishlist} isBorderRadius>
                <StyledButton
                    color="primary"
                    onClick={props.addWishlistItem}
                    text="Create"
                    disabled={!props.wishlistItemToAdd || props.addingItemToWishlist}
                />
                <StyledButton
                    color="secondary"
                    onClick={props.closeAddingToWishlist}
                    text="Cancel"
                    disabled={props.addingItemToWishlist}
                />
            </LoadingDiv>
        </div>
    </div>
);

export default AddToWishlist;
