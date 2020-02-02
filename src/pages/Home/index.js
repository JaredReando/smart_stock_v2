import React from 'react';
import { withAuthorization } from '../../components/Session';
import styled, { css } from 'styled-components';

import RestockList from "./restock_list";

const Wrapper = styled.div`
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HomePage = () => (
    <Wrapper>
        <RestockList />
    </Wrapper>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);