import React from 'react';

import { AuthUserContext } from './index';

const withAuthProvider = Component => props => {
    return (
        <AuthUserContext.Consumer>
            {authUser => <Component {...props} authUser={authUser}/>}
        </AuthUserContext.Consumer>
    )
};

export default withAuthProvider;