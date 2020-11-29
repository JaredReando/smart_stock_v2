import styled from 'styled-components';
import { Box, Column } from '../../component_library/styles/layout';

export const Container = styled(Box)`
    display: grid;
    grid-template-rows: 50px repeat(2, auto) auto auto auto;
    gap: 10px;
    grid-template-columns: 1fr;
    align-items: center;
    height: 100%;
    //max-height: 900px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    overflow: hidden;
    touch-action: manipulation;
`;

export const Section = styled(Column)`
    height: 100%;
    box-shadow: ${props => props.theme.shadows.large};
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    justify-content: space-evenly;
    align-items: flex-start;
`;
