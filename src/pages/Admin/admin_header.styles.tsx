import { FlexColumn, FlexRow } from "../../styles/layout";
import styled from "styled-components";

export const Container = styled(FlexRow)({
    flexGrow: 0,
    flexShrink: 0,
    height: '120px',
});

export const InnerLeftContainer = styled(FlexColumn)(({theme}) => ({
    flexGrow: 1,
    maxWidth: '400px',
    justifyContent: "center",
    paddingLeft: theme.space[5]
}));

export const InnerRightContainer = styled(FlexRow)({
    flexGrow: 1,
});