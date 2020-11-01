import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer as AuthConsumer } from '../context/auth.context';
import VerticalNavBar from '../containers/vertical_nav_bar/vertical_nav_bar';
import { Column } from '../component_library/styles/layout';
import { AdminDataStoreProvider, useInitializeAdminDataStore } from '../hooks/use_admin_data_store';

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
const AdminAuthRoute = ({ component: Component, ...rest }) => {
    return (
        <AuthConsumer>
            {({ validUser }) => (
                <Route
                    {...rest}
                    //'props' here refers to those provided by <Route />: history, location, match, etc.
                    //The Component's unique props don't need to be passed here, since they will
                    //be provided by Dashboard's render of same Component
                    component={props =>
                        validUser ? (
                            <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                                <VerticalNavBar />
                                <Column flexGrow={1} style={{ border: '2px solid red' }}>
                                    <Component {...props} />
                                </Column>
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

const ClientAuthRoute = ({ component: Component, ...rest }) => {
    return (
        <AuthConsumer>
            {({ validUser }) => (
                <Route
                    {...rest}
                    //'props' here refers to those provided by <Route />: history, location, match, etc.
                    //The Component's unique props don't need to be passed here, since they will
                    //be provided by Dashboard's render of same Component
                    component={props =>
                        validUser ? (
                            <div style={{ display: 'flex', height: '100%', width: '100vw' }}>
                                <Column flexGrow={1}>
                                    <Component {...props} />
                                </Column>
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

const signInAuthenticatedRouteBase = ({ component: Component, authUser, ...rest }) => {
    return (
        <AuthConsumer>
            {({ validUser }) => (
                <Route
                    {...rest}
                    //'props' here refers to those provided by <Route />: history, location, match, etc.
                    //The Component's unique props don't need to be passed here, since they will
                    //be provided by Dashboard's render of same Component
                    render={props =>
                        validUser ? (
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
export { AdminAuthRoute, ClientAuthRoute };
