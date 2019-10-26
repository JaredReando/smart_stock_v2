import styled from 'styled-components';

export const NavWrapper = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-bottom: 5px soNavItemd black;
`;

export const NavGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 80px;
    // width: 400px;
    border: 1px solid black;
`;

export const Logo = styled.p`
    padding-left: 80px;
    font-size: 2em;
    font-weight: bold;
    flex-grow: 1;
`;

export const NavItem = styled.div`
    padding-right: 50px;
`;
