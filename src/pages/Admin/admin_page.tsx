import React from 'react';
import styled from 'styled-components';

const Container = styled.div(props => ({
    border: `1px solid ${props.theme.colors.green}`,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const AdminPage = () => {
    return (
        <Container>
            <h1>Admin Dashboard</h1>
        </Container>
    )
};

export default AdminPage;