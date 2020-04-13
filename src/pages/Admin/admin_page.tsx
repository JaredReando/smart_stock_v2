import React from 'react';
import { useActiveUsers } from "../../hooks";
import {Header} from "../../component_library/styles/typography";
import AdminHeader from "./admin_header";
import {Column} from '../../component_library/styles/layout';

const AdminPage = () => {
  const users = useActiveUsers();
  console.log('users: ', users);
  return (
      <>

        <Column height="100%">
            <AdminHeader
                title="Admin Page"
            />
          <Header
            uppercase
            size="xlarge"
          >Admin Dashboard</Header>

        </Column>
      </>
  );
};

export default AdminPage;
