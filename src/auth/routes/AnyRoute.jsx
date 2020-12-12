import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AnyRoute = ({
    component: Component, auth, ...rest
}) => (
    <Route
        {...rest}
        render={props => <Component {...props} />}
    />
);

const mapStateToProps = state => ({
    auth: state.firebase.auth
});

AnyRoute.defaultProps = {
    auth: {},
    component: {},
    loadedPermissions: false
};

AnyRoute.propTypes = {
    auth: PropTypes.PropTypes.shape({
        emailVerified: PropTypes.bool,
        uid: PropTypes.string
    }),
    component: PropTypes.elementType,
    loadedPermissions: PropTypes.bool
};

export default connect(mapStateToProps)(AnyRoute);

export { AnyRoute as AnyRouteUnconnected };
