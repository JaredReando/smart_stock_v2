import styled from 'styled-components';
import { Box, Column } from '../../component_library/styles/layout';

export const Container = styled(Box)`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 3fr 1fr 1fr;
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

export const Section = styled(Column)({
    flexGrow: 0,
    height: '100%',
    border: '1px solid red',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
});
