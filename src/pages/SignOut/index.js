import React from 'react';
import { withRouter } from 'react-router-dom';
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
    },
});
const SignOutButton = ({ firebase, history }) => {
    const handleSignOut = () => {
        firebase.signOut();
        history.push(ROUTES.LOGIN);
    };
    return <SignOut onClick={handleSignOut}>Sign Out</SignOut>;
};

export default compose(withRouter)(SignOutButton);
