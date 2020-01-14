import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut'
import { withAuthConsumer } from '../Session';
import { NavWrapper, NavGroup, Logo } from './navigation.styles.js';

const NavLink = (props) => {
    const style = {
        textDecoration: 'none',
        color: 'green',
        textTransform: 'uppercase',
        paddingRight: '50px'
    };
    return (
        <Link {...props} style={style} />
    )
};
const NavigationAuth = () => (
    <NavGroup>
        <NavLink to={ROUTES.LANDING}>Landing</NavLink>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
        <SignOutButton />
    </NavGroup>
);

const NavigationNonAuth = () => (
    <NavGroup>
        <NavLink to={ROUTES.LANDING}>Landing</NavLink>
        <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
    </NavGroup>
);

const Navigation = ({authUser}) => (
    <NavWrapper>
        <Logo>SmartStock</Logo>
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </NavWrapper>
);

export default withAuthConsumer(Navigation);