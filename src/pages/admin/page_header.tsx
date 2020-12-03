import React from 'react';
import styled from 'styled-components';
import { Row } from '../../component_library/styles/layout';

const PageHeader: React.FC = ({ children }) => {
    return <Container>{children}</Container>;
};

export default PageHeader;

export const Container = styled(Row)(({ theme }) => ({
    flexGrow: 0,
    flexShrink: 0,
    minHeight: '120px',
    margin: '15px 0px',
    maxWidth: '1500px',
    flexWrap: 'wrap',
    paddingLeft: theme.space[3],
    paddingRight: theme.space[3],
    justifyContent: 'space-between',
}));
