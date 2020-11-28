import { lazy } from 'react';

const SignIn = lazy(() => import('./auth/SignIn'));
const SignUp = lazy(() => import('./auth/SignUp'));

const Overview = lazy(() => import('./overview/Overview'));

export {
    SignIn,
    SignUp,
    Overview
};
