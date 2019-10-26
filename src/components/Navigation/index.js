import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut'
import { withAuthConsumer } from '../Session';
import { NavWrapper, NavGroup, Logo, NavItem } from './navigation.styles.js';

const NavigationAuth = () => (
    <NavGroup>
        <NavItem>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </NavItem>
        <NavItem>
            <Link to={ROUTES.HOME}>Home</Link>
        </NavItem>
        <NavItem>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </NavItem>
        <NavItem>
            <SignOutButton />
        </NavItem>
    </NavGroup>
);

const NavigationNonAuth = () => (
    <NavGroup>
        <NavItem>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </NavItem>
        <NavItem>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </NavItem>
    </NavGroup>
);

const Navigation = ({authUser}) => (
    <NavWrapper>
        <Logo>SmartStock</Logo>
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </NavWrapper>
);

export default withAuthConsumer(Navigation);