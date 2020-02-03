import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignUpPage from '../../pages/SignUp';
import SignInPage from '../../pages/SignIn';
import PasswordForgetPage from '../../pages/PasswordForget';
import Dashboard from '../../containers/Dashboard';
import * as ROUTES from '../../constants/routes';
import AuthenticatedRoute, { SignInAuthenticatedRoute } from "../../routing/route_helpers";

const Routes = () => {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <AuthenticatedRoute path={ROUTES.HOME} component={Dashboard} />
                <AuthenticatedRoute path={ROUTES.ACCOUNT} component={Dashboard}/>
                <AuthenticatedRoute path={ROUTES.ADMIN} component={Dashboard}/>
                <AuthenticatedRoute path={ROUTES.ACCOUNT} component={Dashboard}/>
                <Route path={ROUTES.LOGIN} component={SignInPage}/>
                <Route exact path="/" component={SignInPage}/>
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>

            </Switch>
        </BrowserRouter>
    )
};

/*withAuthProvider wraps 'App' in a <AuthUserContext.Provider />...
 HOC. Any lower hierarchy component can access Firebase session status
 by connecting to the consumer provider: withAuthConsumer.
 Consumer will update all connected components with any Firebase Auth
 events (logged in, auth user object, etc...)
 */
export default Routes;