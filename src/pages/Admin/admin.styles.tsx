import styled from 'styled-components';

export const Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  height: 'calc(100% - 40px)',
  paddingBottom: '40px',
});

export const DashContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '200px',
});

export const ReportContainer = styled.div({
  height: 'calc(100% - 200px)',
});

const BaseButton = styled.button({
  border: 'none',
  outline: 'none',
  background: 'lightgreen',
  transition: 'color 100ms linear',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  ':hover': {
    color: 'red',
  },
  ':active': {
    background: 'green',
    color: 'white',
  },
});

export const TestButton = styled(BaseButton)({
  width: '100px',
  height: '40px',
  border: '2px solid black',
  borderRadius: '4px',
});
