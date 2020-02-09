import React from 'react';

import PasswordFogetPage from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = ({ authUser, ...props }) => (
  <div>
    <h1>Account: ACCOUNT EMAIL HERE</h1>
    <PasswordFogetPage />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;
