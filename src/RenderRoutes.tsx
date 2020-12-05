import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as constants from './constants';
import AuthenticatedRoute from './auth/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './auth/routes/UnauthenticatedRoute';
import PrivacyPolicy from './privacypolicy/PrivacyPolicy';
import TermsOfService from './privacypolicy/TermsAndConditions';

import SignIn from './auth/SignIn';

import * as routes from './routes';
import MyGroups from './myGroups/MyGroups';
import Profile from './profile/Profile';
import GroupDetails from './groupDetails/GroupDetails';

const RenderRoutes:React.FC = () => (
    <Switch>
        <AuthenticatedRoute exact path={constants.URL.PROFILE} component={Profile} />
        <AuthenticatedRoute path={`${constants.URL.GROUP_DETAILS}/:groupId`} component={GroupDetails} />
        {routes.signedInLinks.map(link => (
            <AuthenticatedRoute
                exact
                path={link.renderPath}
                key={link.renderPath}
                component={link.component}
            />
        ))}

        <AuthenticatedRoute
            path={constants.URL.MY_GROUPS}
            component={MyGroups}
        />
        <UnauthenticatedRoute
            exact
            path={constants.URL.PRIVACY_POLICY}
            component={PrivacyPolicy}
            redirect={constants.URL.MY_GROUPS}
        />
        <UnauthenticatedRoute
            exact
            path={constants.URL.TERMS_OF_SERVICE}
            component={TermsOfService}
            redirect={constants.URL.MY_GROUPS}
        />
        <UnauthenticatedRoute
            path={constants.URL.SIGN_IN}
            component={SignIn}
            redirect={constants.URL.MY_GROUPS}
        />
        <UnauthenticatedRoute
            exact
            path="/"
            component={SignIn}
            redirect={constants.URL.MY_GROUPS}
        />
        <Route render={() => <Redirect to="/" />} />
    </Switch>
);

export default RenderRoutes;
