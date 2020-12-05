import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import { GroupType } from './types';
import materialStyles from '../materialStyles';
import styles from './Group.module.scss';
import { mapIdToName } from './helpers';

type Props = GroupType & {
    redirectToGroupDetails: (id: string) => void;
}

const Group: React.FC<Props> = (props: Props) => {
    const classes = makeStyles(materialStyles)();
    return (
        <Paper
            elevation={4}
            className={classes.paperNoPadding}
        >
            <div className={styles.groupWrapper}>
                <div className={styles.iconWrapper}>
                    <InfoIcon color="primary" fontSize="large" onClick={() => props.redirectToGroupDetails(props.id)} />
                </div>
                <div className={styles.detailWrapper}>
                    <div className={styles.key}>
                        Group Name
                    </div>
                    <div className={styles.value}>
                        {props.groupName}
                    </div>
                </div>

                <div className={styles.detailWrapper}>
                    <div className={styles.key}>
                        Participants
                    </div>
                    <div className={styles.participantsValue}>
                        {props.participants.map(x => mapIdToName(x, props.displayNameMappings))
                            .join(', ')}
                    </div>
                </div>
            </div>

        </Paper>
    );
};

export default Group;
