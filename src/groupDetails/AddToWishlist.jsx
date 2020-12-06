import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import TextInput from '../common/TextInput/TextInput';
import * as textInputConstants from '../common/TextInput/constants';
import LoadingDiv from '../common/loadingDiv/LoadingDiv';
import StyledButton from '../common/StyledButton/StyledButton';
import styles from './AddToWishlist.module.scss';
import * as appConstants from '../constants';

const AddToWishlist = props => {
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    return (
        <div>
            <div className={classNames({
                [styles.smallWidth]: !isMobile
            })}
            >
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

            </div>

            <div className={styles.buttonWrapper}>
                <LoadingDiv isLoading={props.addingItemToWishlist} isBorderRadius>
                    <StyledButton
                        color="primary"
                        onClick={props.addWishlistItem}
                        text="Add"
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
};

export default AddToWishlist;
