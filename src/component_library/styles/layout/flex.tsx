import { Box } from './box';
import styled from 'styled-components';

//@ts-ignore
export const Row = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
});

export const Column = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});
