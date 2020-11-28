import { lazy } from 'react';

const SignIn = lazy(() => import('./auth/SignIn'));

const Overview = lazy(() => import('./overview/Overview'));
const Profile = lazy(() => import('./profile/Profile'));

export {
    SignIn,
    Overview,
    Profile
};
