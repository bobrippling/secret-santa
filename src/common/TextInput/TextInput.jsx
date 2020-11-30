import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RedeemIcon from '@material-ui/icons/Redeem';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LinkIcon from '@material-ui/icons/Link';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import FaceIcon from '@material-ui/icons/Face';
import { noop } from 'lodash';
import * as constants from './constants';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%'
        }
    }
}));

const generateIcon = (Icon, iconColor) => (
    <InputAdornment position="start">
        <Icon color={iconColor} />
    </InputAdornment>
);

const iconMapping = iconColor => ({
    [constants.textInputIcons.user]: generateIcon(AccountCircle, iconColor),
    [constants.textInputIcons.email]: generateIcon(EmailIcon, iconColor),
    [constants.textInputIcons.lock]: generateIcon(LockIcon, iconColor),
    [constants.textInputIcons.football]: generateIcon(SportsSoccerIcon, iconColor),
    [constants.textInputIcons.money]: generateIcon(AttachMoneyIcon, iconColor),
    [constants.textInputIcons.search]: generateIcon(SearchIcon, iconColor),
    [constants.textInputIcons.face]: generateIcon(FaceIcon, iconColor),
    [constants.textInputIcons.message]: generateIcon(MessageIcon, iconColor),
    [constants.textInputIcons.present]: generateIcon(RedeemIcon, iconColor),
    [constants.textInputIcons.link]: generateIcon(LinkIcon, iconColor)
});

const TextInput = props => {
    const classes = useStyles();

    const { onSubmit } = props;

    const onFormSubmit = useCallback(e => {
        e.preventDefault();
        onSubmit();
    }, [onSubmit]);

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onFormSubmit}>
            <TextField
                id="outlined-secondary"
                label={props.label}
                variant={props.variant}
                error={props.value && props.value.length < props.minLength && props.hasValidation}
                type={props.type}
                color={props.color}
                onBlur={props.onBlur}
                helperText={props.helperText}
                onChange={e => props.onChange(e.target.value)}
                disabled={props.disabled}
                value={props.value}
                InputProps={{
                    startAdornment: iconMapping(props.iconColor)[props.icon]
                }}
            />
        </form>
    );
};

TextInput.defaultProps = {
    color: 'primary',
    icon: null,
    iconColor: '',
    label: '',
    hasValidation: false,
    helperText: null,
    minLength: 1000,
    onBlur: noop,
    onChange: noop,
    onSubmit: noop,
    variant: 'outlined',
    disabled: false,
    type: '',
    value: ''
};

TextInput.propTypes = {
    color: PropTypes.string,
    hasValidation: PropTypes.bool,
    helperText: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    label: PropTypes.string,
    minLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    variant: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string
};

export default TextInput;
