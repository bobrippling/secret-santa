import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as constants from './constants';
import AuthenticatedRoute from './auth/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './auth/routes/UnauthenticatedRoute';

import SignIn from './auth/SignIn';

import * as routes from './routes';
import Overview from './overview/Overview';

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

        <AuthenticatedRoute
            path={constants.URL.OVERVIEW}
            component={Overview}
        />

        <UnauthenticatedRoute
            path={constants.URL.SIGN_IN}
            component={SignIn}
            redirect={constants.URL.OVERVIEW}
        />
        <UnauthenticatedRoute
            exact
            path="/"
            component={SignIn}
            redirect={constants.URL.OVERVIEW}
        />
        <Route render={() => <Redirect to="/" />} />
    </Switch>
);

export default RenderRoutes;
