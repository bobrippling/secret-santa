import { lazy } from 'react';

const SignIn = lazy(() => import('./auth/SignIn'));
const SignUp = lazy(() => import('./auth/SignUp'));

export {
    SignIn,
    SignUp
};
