import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as constants from './constants';
import AuthenticatedRoute from './auth/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './auth/routes/UnauthenticatedRoute';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';

import * as routes from './routes';

const RenderRoutes:React.FC = () => (
    <Switch>
        {routes.signedInLinks.map(link => (
            <AuthenticatedRoute
                exact
                path={link.renderPath}
                key={link.renderPath}
                component={link.component}
            />
        ))}

        <UnauthenticatedRoute
            path={constants.URL.SIGN_IN}
            component={SignIn}
        />
        <UnauthenticatedRoute
            path={constants.URL.SIGN_UP}
            component={SignUp}
        />
        <UnauthenticatedRoute
            exact
            path="/"
            component={SignIn}
        />
        <Route render={() => <Redirect to="/" />} />
    </Switch>
);

export default RenderRoutes;
