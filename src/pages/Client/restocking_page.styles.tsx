import styled from 'styled-components';
import { Column } from '../../component_library/styles/layout';

export const Container = styled(Column)({
    alignItems: 'center',
    height: '100%',
    maxHeight: '900px',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    border: '1px solid green',
    touchAction: 'manipulation',
});

export const Section = styled(Column)({
    flexGrow: 0,
    border: '1px solid red',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
});
