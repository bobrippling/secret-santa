import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import SideList from './SideList';

const SideNavbar = (props: any) => (
    <SwipeableDrawer
        open={props.isOpen}
        onClose={props.closeNavbar}
        onOpen={props.closeNavbar}
    >
        <SideList
            currentPath={props.currentPath}
            disabledPages={props.disabledPages}
            redirect={props.redirect}
            isSignedIn={props.isSignedIn}
            maxGameWeek={props.maxGameWeek}
            originalTeam={props.originalTeam}
            userId={props.userId}
            userPermissions={props.userPermissions}
        />
    </SwipeableDrawer>
);

export default SideNavbar;
