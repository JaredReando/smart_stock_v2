import { Box } from './box';
import styled from "styled-components";

const Flex = styled(Box)({
    display: 'flex',
});

export const FlexRow = styled(Flex)({
    flexDirection: 'row',
});

export const FlexColumn = styled(Flex)({
    flexDirection: 'column',
});
