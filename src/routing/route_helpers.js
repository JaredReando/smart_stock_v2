import React from 'react';
import { Route, Redirect } from 'react-router-dom';
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
const AdminAuthRoute = ({ authUser, component: Component, ...rest }) => {
    const adminDataStore = useInitializeAdminDataStore();
    return (
        <Route
            {...rest}
            //'props' here refers to those provided by <Route />: history, location, match, etc.
            //The Component's unique props don't need to be passed here, since they will
            //be provided by Dashboard's render of same Component
            component={props =>
                authUser ? (
                    <AdminDataStoreProvider value={adminDataStore}>
                        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                            <VerticalNavBar />
                            <Column flexGrow={1}>
                                <Component {...props} />
                            </Column>
                        </div>
                    </AdminDataStoreProvider>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const ClientAuthRoute = ({ component: Component, ...rest }) => {
    const [height, setHeight] = React.useState(window.innerHeight);
    const updateHeight = () => {
        setHeight(window.innerHeight);
    };
    React.useEffect(() => {
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    });
    return (
        <Route
            {...rest}
            //'props' here refers to those provided by <Route />: history, location, match, etc.
            //The Component's unique props don't need to be passed here, since they will
            //be provided by Dashboard's render of same Component
            component={props => (
                <div
                    style={{
                        display: 'flex',
                        height: `${height}px`,
                        width: '100vw',
                    }}
                >
                    <Component {...props} />
                </div>
            )}
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
                authUser ? (
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
    );
};
export const SignInAuthenticatedRoute = signInAuthenticatedRouteBase;
export { AdminAuthRoute, ClientAuthRoute };
