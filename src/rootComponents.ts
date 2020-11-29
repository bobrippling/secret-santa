import { lazy } from 'react';

const SignIn = lazy(() => import('./auth/SignIn'));

const MyGroups = lazy(() => import('./myGroups/MyGroups'));
const Profile = lazy(() => import('./profile/Profile'));

export {
    SignIn,
    MyGroups,
    Profile
};
