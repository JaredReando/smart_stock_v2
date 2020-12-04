import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpPage from '../pages/user_authentication/sign_up';
import SignInPage from '../pages/user_authentication/sign_in';
import PasswordForgetPage from '../pages/user_authentication/password_forget';
import ClientPage from '../pages/client/client_restocking_page';
import { AdminAuthRoute, ClientAuthRoute } from './route_helpers';
import NotFound404Page from '../pages/not_found_404_page';
import AdminRouter from './admin_router';

interface Props {
    authUser: any;
}
const Routes: React.FC<Props> = ({ authUser }) => {
    return (
        <BrowserRouter>
            <Switch>
                <ClientAuthRoute authUser={authUser} path={'/restock'} component={ClientPage} />
                {authUser && (
                    <AdminAuthRoute authUser={authUser} path={'/'} component={AdminRouter} />
                )}
                {authUser === null && (
                    <>
                        <Route exact path="/" component={SignInPage} />
                        <Route path={'/login'} component={SignInPage} />
                        <Route path={'/sign_up'} component={SignUpPage} />
                        <Route path={'/forgot_password'} component={PasswordForgetPage} />
                        <Route component={NotFound404Page} />
                    </>
                )}
                <Route component={NotFound404Page} />
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
