import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {withAuthConsumer} from "../components/Session";

/*This component needs to know about:
    - User's Firebase login status
        - Provided by 'withAuthConsumer' HOC
*/

const AuthenticatedRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
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

export default withAuthConsumer(AuthenticatedRoute)