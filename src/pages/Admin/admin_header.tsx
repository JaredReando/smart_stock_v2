import React from 'react';
import {
    Container,
    InnerLeftContainer,
    InnerRightContainer,
} from "./admin_header.styles";
import {Header} from '../../component_library/styles/typography'

interface Props {
    title: string;
}
const AdminHeader: React.FC<Props> = ({title, children}) => {
    return (
        <Container>
            <InnerLeftContainer>
                <Header>{title}</Header>
            </InnerLeftContainer>
            <InnerRightContainer>
                {children}
            </InnerRightContainer>
        </Container>
    )
};

export default AdminHeader;