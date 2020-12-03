import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFound404Page: React.FC = () => {
    return <Redirect to={'/'} />;
};

export default NotFound404Page;
