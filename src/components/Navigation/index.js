import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../../pages/SignOut'
import { NavWrapper, NavGroup, Logo } from './navigation.styles.js';

const NavLink = (props) => {
    const style = {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'uppercase',
        marginRight: '50px',
    };
    return (
        <Link {...props} style={style} />
    )
};
const NavigationAuth = () => (
    <NavGroup>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
        <NavLink to={ROUTES.CLIENT}>Client</NavLink>
        <SignOutButton />
    </NavGroup>
);

const NavigationNonAuth = () => (
    <NavGroup>
        <NavLink to={ROUTES.LOGIN}>Sign In</NavLink>
    </NavGroup>
);

const Navigation = ({authUser}) => (
    <NavWrapper>
        <Logo>SmartStock</Logo>
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </NavWrapper>
);

export default Navigation;