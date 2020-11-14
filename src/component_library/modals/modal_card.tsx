import styled from 'styled-components';
import React from 'react';
import { Column, Row } from '../styles/layout';
import { theme } from '../styles/theme';
import { Header } from '../styles/typography';

const Container = styled.div`
    max-width: 450px;
    border-radius: 4px;
    box-shadow: ${props => props.theme.shadows.large};
    background: white;
    justify-content: space-between;
`;

interface ModalCardProps {
    headingText?: string;
}

export const ModalCard: React.FC<ModalCardProps> = ({ headingText, children }) => {
    return (
        <Container>
            {headingText && (
                <Row backgroundColor={theme.colors.primary} alignItems="center" px={5} py={3}>
                    <Header color="light">{headingText}</Header>
                </Row>
            )}
            <Column padding={5}>{children}</Column>
        </Container>
    );
};
