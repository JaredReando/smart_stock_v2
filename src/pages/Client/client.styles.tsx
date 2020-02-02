import styled from 'styled-components';

const flexCentered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const Container = styled.div({
    ...flexCentered,
    height: '100%',
    maxHeight: '600px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    border: '1px solid green'
});
