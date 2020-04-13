import { Box } from './box';
import styled from "styled-components";

const Flex = styled(Box)({
    display: 'flex',
});

export const Row = styled(Flex)({
    flexDirection: 'row',
});

export const Column = styled(Flex)({
    flexDirection: 'column',
});
