import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import Dashboard from '../Dashboard';

import * as ROUTES from '../../constants/routes';
import AuthenticatedRoute, { SignInAuthenticatedRoute } from "../../helpers/route_helpers";

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Dashboard}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                    <SignInAuthenticatedRoute path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>

                    <AuthenticatedRoute path={ROUTES.HOME} component={Dashboard} />
                    <AuthenticatedRoute path={ROUTES.ACCOUNT} component={Dashboard}/>
                    <AuthenticatedRoute path={ROUTES.ADMIN} component={Dashboard}/>
                    <AuthenticatedRoute path={ROUTES.ACCOUNT} component={Dashboard}/>
                    <AuthenticatedRoute path={ROUTES.LANDING} component={Dashboard}/>
                </Switch>
            </div>
        </Router>
    )
};

/*withAuthProvider wraps 'App' in a <AuthUserContext.Provider />...
 HOC. Any lower hierarchy component can access Firebase session status
 by connecting to the consumer provider: withAuthConsumer.
 Consumer will update all connected components with any Firebase Auth
 events (logged in, auth user object, etc...)
 */
export default App;