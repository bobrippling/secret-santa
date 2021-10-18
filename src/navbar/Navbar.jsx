import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import { signOut } from '../auth/actions';

const NewNavbar = props => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const closeSidebar = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);
    const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen),
        [sidebarOpen, setSidebarOpen]);

    const redirect = useCallback(redirectLocation => {
        setSidebarOpen(false);
        props.history.push(redirectLocation);
    }, [props.history]);

    const onItemClick = useCallback(path => {
        redirect(path);
    }, [redirect]);

    const groups = _.map(props.groups, (value, id) => ({ id, ...value }))
        .filter(x => x.participants && x.participants.includes(props.auth.uid));

    return (
        <>
            <TopNavbar
                auth={props.auth}
                redirect={onItemClick}
                signOut={props.signOut}
                toggleNavbar={toggleSidebar}
            />

            <SideNavbar
                closeNavbar={closeSidebar}
                currentPath={props.history.location.pathname}
                groups={groups}
                isOpen={sidebarOpen}
                isSignedIn={Boolean(props.auth.uid)}
                redirect={onItemClick}
            />
        </>

    );
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    groups: state.firestore.data.groups,
    profile: state.firebase.profile,
    pathname: state.router.location.pathname
});

const mapDispatchToProps = {
    signOut
};

NewNavbar.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string,
        emailVerified: PropTypes.bool,
        photoURL: PropTypes.string
    }),
    groups: PropTypes.shape({}),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    }).isRequired,
    signOut: PropTypes.func.isRequired
};

NewNavbar.defaultProps = {
    auth: {},
    groups: {}
};

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => [
        {
            collection: 'groups',
            storeAs: 'groups'
        }
    ])
)(NewNavbar));

export { NewNavbar as NewNavbarUnconnected };
