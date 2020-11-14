import styled, { css } from 'styled-components';

export const boxShadow = () => {
    return {
        transition: 'box-shadow .15s ease-in',
        boxShadow: '0 2px 4px 0 rgba(63,103,139,0.50)',
        ':hover': {
            boxShadow: '0 0 8px 0 rgba(63,103,139,0.10), 0 8px 8px 0 rgba(63,103,139,0.25)',
        },
        ':active': {
            boxShadow: 'none',
        },
    };
};

export const disableButton = (props: any) => {
    return {
        opacity: props.disabled ? 0.5 : 1,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
    };
};

export const Container = styled.div({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const BigBold = styled.p<{ fontSize: any }>`
    font-weight: bold;
    ${props =>
        css`
            font-size: ${props.fontSize};
        `}
`;
export const Form = styled.form({
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '500px',
    height: '500px',
    border: '1px solid #dadce0',
});

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
    width: '85%',
    border: '1px solid #dadce0',
    borderRadius: '5px',
    fontSize: '1em',
    padding: '10px',
    margin: '10px',
});

export const Button = styled.button(
    ({ theme }) => ({
        width: '85%',
        height: '40px',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '1em',
        backgroundColor: theme.colors.green,
    }),
    boxShadow,
    disableButton,
);
