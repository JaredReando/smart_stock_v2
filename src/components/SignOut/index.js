import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import styled from 'styled-components';

import * as ROUTES from '../../constants/routes';

const SignOut = styled.button({
    border: 'none',
    outline: 'none',
    fontWeight: 'bold',
    color: 'black',
    textAligh: 'center',
    textTransform: 'uppercase',
    fontSize: '1em',
    ':hover': {
        cursor: 'pointer',
        background: 'lightgrey',
    }
})
const SignOutButton = ({ firebase, history }) => {
    const handleSignOut = () => {
      firebase.doSignOut();
      history.push(ROUTES.SIGN_IN)
    };
    return (
        <SignOut onClick={handleSignOut}>
            Sign Out
        </SignOut>
    )
};

export default compose(
    withFirebase,
    withRouter,
)(SignOutButton);