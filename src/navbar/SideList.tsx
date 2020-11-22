import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import * as routes from '../routes';
import defaultStyles from './SideList.module.scss';

const SideList = (props: any) => {
    const linksToRender = props.isSignedIn ? routes.signedInLinks : routes.signedOutLinks;

    const onItemClick = useCallback(item => {
        props.redirect(item.path(props));
    }, [props]);

    return (
        <div
            role="presentation"
            onClick={props.closeNavbar}
            onKeyDown={props.closeNavbar}
        >
            <List>
                {linksToRender.map(item => (
                    <ListItem
                        button
                        key={item.title}
                        onClick={() => onItemClick(item)}
                        className={classNames({
                            [defaultStyles.activeRoute]: props.currentPath
                                .includes(item.urlIncludes)
                        })}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default SideList;
