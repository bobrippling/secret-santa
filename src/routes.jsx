import React, { Suspense } from 'react';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import * as rootComponents from './rootComponents';
import * as constants from './constants';
import Spinner from './common/spinner/Spinner';

const generateLazyComponent = Component => () => (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '30px' }}><Spinner /></div>}>
        <Component />
    </Suspense>
);

export const signedOutLinks = [
    {
        title: 'Sign In',
        icon: <AccountBoxIcon color="primary" />,
        component: generateLazyComponent(rootComponents.SignIn, 'Sign In'),
        path: () => constants.URL.SIGN_IN,
        urlIncludes: constants.URL.SIGN_IN
    }
];

export const signedInLinks = [
    {
        title: 'My Groups',
        icon: <DoubleArrowIcon color="primary" />,
        component: generateLazyComponent(rootComponents.MyGroups, 'My Groups'),
        path: () => constants.URL.MY_GROUPS,
        urlIncludes: constants.URL.MY_GROUPS,
        renderPath: constants.URL.MY_GROUPS
    }
];
