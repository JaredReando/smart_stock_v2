import React from 'react';
import styled from 'styled-components';

export const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
});

export const ComponentContainer = styled.div({
    flexGrow: 1,
    display: 'flex',
    overflow: 'scroll',
});

