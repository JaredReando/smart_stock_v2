import React, {useState} from 'react';
import styled from 'styled-components';
import AppModal from "../../components/modals/app_modal";
import { useActiveUsers } from "../../hooks";

const Container = styled.div(props => ({
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const SmallContainer = styled.div(({theme}) => ({
    height: '400px',
    width: '400px',
    backgroundColor: theme.colors.azure,
    color: theme.colors.white,
    border: '1px solid black'
}));

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const users = useActiveUsers();
  console.log('users: ', users);
  return (
    <Container>
      <button onClick={() => setShowModal(s => !s)}>Modal</button>
      <AppModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <SmallContainer>
            <h1>Howdy</h1>
          </SmallContainer>
      </AppModal>
      <h1>Admin Dashboard</h1>

    </Container>
  );
};

export default AdminPage;
