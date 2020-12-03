import React from 'react';
import styles from './ManageGiftRestrictions.module.scss';

type Props = {
}

const ManageGiftRestrictions: React.FC<Props> = (props: Props) => (
    <div>
        <div className={styles.instructionsMessage}>
            Anybody in the same group will not be able to send or receive a gift from each other
        </div>
    </div>
);

export default ManageGiftRestrictions;
