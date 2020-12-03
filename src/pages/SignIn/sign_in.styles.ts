import styled from 'styled-components';
import { AppText } from '../../component_library/styles/typography';

export const Container = styled.div(({ theme }) => ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.primary,
}));

export const BigBold = styled(AppText)<{ fontSize: any }>`
    font-weight: bold;
    font-size: ${props => props.fontSize};
`;

export const Form = styled.form(({ theme }) => ({
    padding: `${theme.space[6]}px ${theme.space[6]}px ${theme.space[3]}px ${theme.space[6]}px`,
    background: theme.colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    boxShadow: theme.shadows.large,
    width: '100%',
    maxWidth: '500px',
}));

export const ErrorMessage = styled.div({
    textAlign: 'center',
    backgroundColor: 'tomato',
    lineHeight: '1.5em',
    color: '#fff',
    borderRadius: '5px',
    width: '80%',
    padding: '10px',
});

export const Input = styled.input({
    border: '1px solid #dadce0',
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '1em',
});
