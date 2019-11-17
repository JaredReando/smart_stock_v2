import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {withAuthConsumer} from "../components/Session";

/*This component needs to know about:
    - User's Firebase login status
        - Provided by 'withAuthConsumer' HOC
*/

/* Destructures props into Component(value is actual React component element),
loggedIn boolean value from Redux, and {...rest} object
It returns a standard <Route /> component, passing {..rest} prop object along and rendering a page component
If 'loggedIn' value is true, the specified Component from props is rendered
If 'loggedIn' value is false, user is redirected back to home page
 */
const AuthenticatedRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            //'props' here refers to those provided by <Route />: history, location, match, etc.
            //The Component's unique props don't need to be passed here, since they will
            //be provided by Dashboard's render of same Component
            render={props =>
                authUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.SIGN_IN,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const signInAuthenticatedRouteBase = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            //'props' here refers to those provided by <Route />: history, location, match, etc.
            //The Component's unique props don't need to be passed here, since they will
            //be provided by Dashboard's render of same Component
            render={props =>
                !authUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.HOME,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};
export const SignInAuthenticatedRoute = withAuthConsumer(signInAuthenticatedRouteBase);
export default withAuthConsumer(AuthenticatedRoute)