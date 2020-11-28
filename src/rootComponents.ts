import { lazy } from 'react';

const SignIn = lazy(() => import('./auth/SignIn'));

const Overview = lazy(() => import('./overview/Overview'));

export {
    SignIn,
    Overview
};
