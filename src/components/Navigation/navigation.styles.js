import styled from 'styled-components';

export const NavWrapper = styled.nav({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
});


export const NavGroup = styled.div({
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '80px',
});

export const Logo = styled.p({
    paddingLeft: '80px',
    fontSize: '2em',
    fontWeight: 'bold',
    flexGrow: 1,
});
