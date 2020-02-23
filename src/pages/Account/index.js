import React from 'react';

import PasswordForgetPage from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = ({ authUser, ...props }) => (
  <div>
    <h1>Account: ACCOUNT EMAIL HERE</h1>
    <PasswordForgetPage />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;
