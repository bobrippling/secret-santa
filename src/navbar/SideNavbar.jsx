import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SideList from './SideList';

const SideNavbar = props => (
    <SwipeableDrawer
        open={props.isOpen}
        onClose={props.closeNavbar}
        onOpen={props.closeNavbar}
    >
        <SideList
            closeNavbar={props.closeNavbar}
            currentPath={props.currentPath}
            groups={props.groups}
            redirect={props.redirect}
            isSignedIn={props.isSignedIn}
        />
    </SwipeableDrawer>
);

export default SideNavbar;
