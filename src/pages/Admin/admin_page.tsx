import React from 'react';
import { useActiveUsers } from "../../hooks";
import {Header} from "../../styles/typography";
import AdminHeader from "./admin_header";
import {FlexColumn} from '../../styles/layout';

const AdminPage = () => {
  const users = useActiveUsers();
  console.log('users: ', users);
  return (
      <>

        <FlexColumn height="100%">
            <AdminHeader
                title="Admin Page"
            />
          <Header
            uppercase
            size="xlarge"
          >Admin Dashboard</Header>

        </FlexColumn>
      </>
  );
};

export default AdminPage;
