import React, {useState} from 'react';
import styled from 'styled-components';
import AppModal from "../../components/Modals/app_modal";
import {VerticalIconBar} from "../../components/vertical_icon_bar";

const Container = styled.div(props => ({
  border: `1px solid ${props.theme.colors.green}`,
  height: '100vh',
  width: '100vw',
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

const testTabs = [
    {
        title: "home",
        iconName: "home"
    },
    {
        title: "settings",
        iconName: "settings"
    }
];

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Container>
      <AppModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <SmallContainer>
            <h1>Howdy</h1>
          </SmallContainer>
      </AppModal>

        <VerticalIconBar
            tabs={testTabs}
            handleClick={() => console.log("clicked")}
            activeTabIndex={0}
        />

      <h1>Admin Dashboard</h1>
      <button onClick={() => setShowModal(s => !s)}>Modal</button>

    </Container>
  );
};

export default AdminPage;
