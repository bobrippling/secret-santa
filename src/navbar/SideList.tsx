import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import * as routes from '../routes';
import defaultStyles from './SideList.module.scss';
import * as constants from '../constants';
import { GroupType } from '../myGroups/types';

type Props = {
    closeNavbar: () => void;
    currentPath: string;
    isSignedIn: boolean;
    redirect: (path: string) => void;
    groups: GroupType[];
};

const SideList: React.FC<Props> = (props: Props) => {
    const linksToRender = props.isSignedIn ? routes.signedInLinks : routes.signedOutLinks;

    const onItemClick = useCallback(item => {
        props.redirect(item.path(props));
    }, [props]);

    return (
        <div
            role="presentation"
            onClick={props.closeNavbar}
            onKeyDown={props.closeNavbar}
            className={defaultStyles.maxWidthSidebar}
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
                {props.groups.map(group => (
                    <ListItem
                        button
                        key={group.id}
                        onClick={() => props.redirect(`${constants.URL.GROUP_DETAILS}/${group.id}`)}
                        className={classNames({
                            [defaultStyles.activeRoute]: props.currentPath
                                .includes(`${constants.URL.GROUP_DETAILS}/${group.id}`)
                        })}
                    >
                        {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                        <ListItemText primary={group.groupName} />
                    </ListItem>
                ))}

            </List>
        </div>
    );
};

export default SideList;
