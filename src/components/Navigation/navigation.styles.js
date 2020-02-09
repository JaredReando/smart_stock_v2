import styled from 'styled-components';

export const NavWrapper = styled.nav({
  display: 'flex',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
});

export const NavGroup = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

export const Logo = styled.p({
  fontSize: '2em',
  fontWeight: 'bold',
  flexGrow: 1,
});
