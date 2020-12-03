import { Row } from '../../component_library/styles/layout';
import styled from 'styled-components';

export const Container = styled(Row)(({ theme }) => ({
    flexGrow: 0,
    flexShrink: 0,
    minHeight: '120px',
    margin: '15px 0px',
    maxWidth: '1500px',
    flexWrap: 'wrap',
    paddingLeft: theme.space[3],
    paddingRight: theme.space[3],
    justifyContent: 'space-between',
}));
