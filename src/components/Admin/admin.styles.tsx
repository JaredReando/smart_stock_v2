import styled from 'styled-components';

export const Container = styled.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    height: '100%',
    // overflow: 'hidden'
});

export const DashContainer = styled.div({
    height: '200px',
});

export const ReportContainer = styled.div({
    height: 'calc(100% - 200px)',
});