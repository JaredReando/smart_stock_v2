import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFound404: React.FC = () => {
    console.log('not found');
    return <Redirect to={'/'} />;
};

export default NotFound404;
