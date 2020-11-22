import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
// import { signOut } from '../auth/actions';

const NewNavbar = (props: any) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const closeSidebar = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);
    const openSidebar = useCallback(() => setSidebarOpen(true), [setSidebarOpen]);
    const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen),
        [sidebarOpen, setSidebarOpen]);

    const redirect = useCallback(redirectLocation => {
        setSidebarOpen(false);
        props.history.push(redirectLocation);
    }, [props.history]);

    const onItemClick = useCallback(path => {
        redirect(path);
    }, [props, redirect]);

    return (
        <>
            <TopNavbar
                auth={props.auth}
                closeNavbar={closeSidebar}
                currentPath={props.history.location.pathname}
                isSignedIn={props.auth.uid && props.auth.emailVerified}
                maxGameWeek={props.maxGameWeek}
                openNavbar={openSidebar}
                redirect={onItemClick}
                // signOut={props.signOut}
                toggleNavbar={toggleSidebar}
                userId={props.auth.uid}
                userPermissions={props.userPermissions}
            />

            <SideNavbar
                closeNavbar={closeSidebar}
                currentPath={props.history.location.pathname}
                isOpen={sidebarOpen}
                isSignedIn={props.auth.uid && props.auth.emailVerified}
                openNavbar={openSidebar}
                redirect={onItemClick}
                toggleNavbar={toggleSidebar}
                userId={props.auth.uid}
            />
        </>

    );
};

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    pathname: state.router.location.pathname
});

const mapDispatchToProps = {
    // signOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNavbar));

export { NewNavbar as NewNavbarUnconnected };
