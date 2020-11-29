import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';
import defaultStyles from './LinkAccounts.module.scss';
import GoogleImage from '../../common/images/google-image.jpg';
import FacebookImage from '../../common/images/facebook-image.jpg';
// import PhoneImage from '../../common/images/phone-call-icon.jpg';
import materialStyles from '../../materialStyles';
import * as appConstants from '../../constants';

const LinkAccounts = props => {
    const isMobile = useMediaQuery(`(max-width:${appConstants.mobileScreenSize}px)`);
    const classes = makeStyles(materialStyles)();
    return (
        <>
            <Paper
                elevation={4}
                className={classNames({
                    [classes.paperNoPadding]: true,
                    [classes.paperTinyWidth]: !isMobile
                })}
            >
                <div className={classNames({
                    [props.styles.facebookLinkWrapper]: true,
                    [props.styles.clickFacebook]: !props.isSignedInWithFacebook
                })}
                >
                    <div
                        className={props.styles.facebookLinkMessage}
                        onClick={props.linkProfileToFacebook}
                        role="button"
                        tabIndex={0}
                    >
                        {props.isSignedInWithFacebook ? 'You have linked your Facebook account ' : 'Link your Facebook account'}
                    </div>
                    <div className={props.styles.facebookLinkImage}>
                        <img
                            alt="Facebook"
                            className={props.styles.facebookImage}
                            src={FacebookImage}
                            onClick={props.linkProfileToFacebook}
                            role="presentation"
                        />
                    </div>
                </div>
            </Paper>
            <Paper
                elevation={4}
                className={classNames({
                    [classes.paperNoPadding]: true,
                    [classes.paperTinyWidth]: !isMobile
                })}
            >
                <div className={classNames({
                    [props.styles.googleLinkWrapper]: true,
                    [props.styles.clickGoogle]: !props.isSignedInWithGoogle
                })}
                >
                    <div
                        className={props.styles.googleLinkMessage}
                        onClick={props.linkProfileToGoogle}
                        role="button"
                        tabIndex={0}
                    >
                        {props.isSignedInWithGoogle ? 'You have linked your Google account ' : 'Link your Google account'}
                    </div>
                    <div className={props.styles.googleLinkImage}>
                        <img
                            alt="Google"
                            className={props.styles.googleImage}
                            src={GoogleImage}
                            onClick={props.linkProfileToGoogle}
                            role="presentation"
                        />
                    </div>
                </div>
            </Paper>
        </>
    );
};

LinkAccounts.propTypes = {
    isSignedInWithFacebook: PropTypes.bool,
    isSignedInWithGoogle: PropTypes.bool,
    // isSignedInWithPhone:/ PropTypes.bool,
    linkProfileToFacebook: PropTypes.func,
    linkProfileToGoogle: PropTypes.func,
    // linkProfileToPhone: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

LinkAccounts.defaultProps = {
    isSignedInWithFacebook: false,
    isSignedInWithGoogle: false,
    // isSignedInWithPhone: false,
    linkProfileToFacebook: noop,
    linkProfileToGoogle: noop,
    // linkProfileToPhone: noop,
    styles: defaultStyles
};

export default LinkAccounts;
