import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';

type Props = {
    auth: {
        emailVerified: boolean;
        isLoaded: boolean;
        isEmpty: boolean;
        uid: string;
    },
    history: any;
    signOut: () => void;

};

const NewNavbar: React.FC<any> = (props: Props) => {
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
    }, [props, redirect]);

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
                isOpen={sidebarOpen}
                isSignedIn={Boolean(props.auth.uid && props.auth.emailVerified)}
                redirect={onItemClick}
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
