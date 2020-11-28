import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as constants from '../../constants';

const AuthenticatedRoute = ({
    component: Component, auth, ...rest
}) => {
    if (!auth.uid) {
        return <Redirect to={constants.URL.SIGN_IN} />;
    }
    return (
        <Route
            {...rest}
            render={props => <Component {...props} />}
        />
    );
};

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

AuthenticatedRoute.defaultProps = {
    auth: {},
    component: {},
    loadedPermissions: false
};

AuthenticatedRoute.propTypes = {
    auth: PropTypes.PropTypes.shape({
        emailVerified: PropTypes.bool,
        uid: PropTypes.string
    }),
    component: PropTypes.elementType,
    loadedPermissions: PropTypes.bool
};

export default connect(mapStateToProps)(AuthenticatedRoute);

export { AuthenticatedRoute as AuthenticatedRouteUnconnected };
