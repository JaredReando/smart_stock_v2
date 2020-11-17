import { Column, Row } from '../../component_library/styles/layout';
import styled from 'styled-components';

export const Container = styled(Row)({
    flexGrow: 0,
    flexShrink: 0,
    height: '120px',
    marginTop: '15px',
});

export const InnerLeftContainer = styled(Column)(({ theme }) => ({
    flexGrow: 1,
    maxWidth: '400px',
    justifyContent: 'flex-start',
    paddingLeft: theme.space[5],
}));

export const InnerRightContainer = styled(Row)({
    flexGrow: 1,
});
