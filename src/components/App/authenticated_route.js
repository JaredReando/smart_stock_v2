import React from 'react'
import { Route } from 'react-router-dom';

import { withAuthConsumer } from '../Session';

const AuthenticatedRoute = ({authUser, ...rest}) => {

    return (

    )
}

export default withAuthConsumer(AuthenticatedRoute);