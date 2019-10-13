import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';

const SignOutButton = ({ firebase, history }) => {
    const handleSignOut = () => {
      firebase.doSignOut();
      history.push(ROUTES.LANDING)
    };
    return (
        <button type="button" onClick={handleSignOut}>
            Sign Out
        </button>
    )
};

export default compose(
    withFirebase,
    withRouter,
)(SignOutButton);