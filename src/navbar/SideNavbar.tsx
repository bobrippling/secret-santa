import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SideList from './SideList';

type Props = {
    closeNavbar: () => void;
    currentPath: string;
    isOpen: boolean;
    isSignedIn: boolean;
    redirect: (path: string) => void;
};

const SideNavbar: React.FC<Props> = (props: Props) => (
    <SwipeableDrawer
        open={props.isOpen}
        onClose={props.closeNavbar}
        onOpen={props.closeNavbar}
    >
        <SideList
            closeNavbar={props.closeNavbar}
            currentPath={props.currentPath}
            redirect={props.redirect}
            isSignedIn={props.isSignedIn}
        />
    </SwipeableDrawer>
);

export default SideNavbar;
