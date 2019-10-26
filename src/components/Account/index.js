import React from 'react';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, withAuthConsumer } from '../Session';

const AccountPage = ({authUser, ...props}) => (
    <div>
        <h1>Account: {props.userEmail}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </div>
);

const condition = authUser => !!authUser
export default compose(
    withAuthConsumer,
    withAuthorization(condition)
)(AccountPage);