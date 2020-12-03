import React from 'react';
import { Container } from './admin_header.styles';

const AdminHeader: React.FC = ({ children }) => {
    return <Container>{children}</Container>;
};

export default AdminHeader;
