import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignUpPage from '../pages/SignUp';
import SignInPage from '../pages/SignIn';
import PasswordForgetPage from '../pages/PasswordForget';
import ClientPage from '../pages/Client';
import {AdminAuthRoute, ClientAuthRoute} from './route_helpers';
import NotFound404 from '../pages/not_found_404';
import AdminRouter from "./admin_router";

const Routes = () => {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <ClientAuthRoute path={'/client'} component={ClientPage} />
        <AdminAuthRoute path={'/admin'} component={AdminRouter} />

        <Route exact path="/" component={SignInPage} />
        <Route path={'/login'} component={SignInPage} />
        <Route path={'/sign_up'} component={SignUpPage} />
        <Route path={'/forgot_password'} component={PasswordForgetPage} />
        <Route component={NotFound404} />
      </Switch>
    </BrowserRouter>
  );
};

/*withAuthProvider wraps 'App' in a <AuthUserContext.Provider />...
 HOC. Any lower hierarchy component can access Firebase session status
 by connecting to the consumer provider: withAuthConsumer.
 Consumer will update all connected components with any Firebase Auth
 events (logged in, auth user object, etc...)
 */
export default Routes;
