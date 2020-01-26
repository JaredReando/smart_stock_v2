import styled from 'styled-components';

export const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
});

export const DashContainer = styled.div({
    height: '200px',
});

export const ReportContainer = styled.div({
    height: 'calc(100% - 200px)',
});