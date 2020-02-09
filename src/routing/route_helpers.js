import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer as AuthConsumer } from '../context/auth.context';
import VerticalNavBar from "../containers/vertical_nav_bar/vertical_nav_bar";

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
const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthConsumer>
      {({ user }) => (
        <Route
          {...rest}
          //'props' here refers to those provided by <Route />: history, location, match, etc.
          //The Component's unique props don't need to be passed here, since they will
          //be provided by Dashboard's render of same Component
          component={props =>
            user ? (
                <div style={{display: 'flex', height: '100vh', width: '100vw'}}>
                  <VerticalNavBar/>
                  <Component {...props} />
                </div>
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </AuthConsumer>
  );
};

const signInAuthenticatedRouteBase = ({
  component: Component,
  authUser,
  ...rest
}) => {
  console.log('login route');
  return (
    <AuthConsumer>
      {({ user }) => (
        <Route
          {...rest}
          //'props' here refers to those provided by <Route />: history, location, match, etc.
          //The Component's unique props don't need to be passed here, since they will
          //be provided by Dashboard's render of same Component
          render={props =>
            user ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </AuthConsumer>
  );
};
export const SignInAuthenticatedRoute = signInAuthenticatedRouteBase;
export default AuthenticatedRoute;
