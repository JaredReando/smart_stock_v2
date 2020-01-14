import styled from 'styled-components';

export const Container = styled.div({
    height: 'calc(100% - 60px)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1,
});

export const DashContainer = styled.div({
    //flexBasis sets minimum space possible before other flex values are calculated
    flexBasis: '120px',
    //shrink === 0 ensures flexBasis still applies
    flexShrink: 0,
    outline: '1px solid orange',
});

export const ReportContainer = styled.div({
    border: '1px solid blue',
});