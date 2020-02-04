import styled, { css } from "styled-components";

export const boxShadow = () => {
    return {
        transition: 'box-shadow .15s ease-in',
        boxShadow: '0 2px 4px 0 rgba(63,103,139,0.50)',
        ':hover': {
            boxShadow: '0 0 8px 0 rgba(63,103,139,0.10), 0 8px 8px 0 rgba(63,103,139,0.25)',
            cursor: 'pointer',
        },
        ':active': {
            boxShadow: 'none',
        },
    };
};

export const disableButton = (props: any) => {
    return {
        opacity: props.disabled ? 0.5 : 1,
    };
};

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BigBold = styled.p<{fontSize: any}>`
    font-weight: bold;
    ${props => css`font-size: ${props.fontSize};`}
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 450px;
    height: 500px;
    border: 1px solid #dadce0;
    
    & * {
        margin: 10px;
    }
    
`;

export const ErrorMessage = styled.div`
text-align: center;
    background-color: tomato;
    line-height: 1.5em;
    color: #fff;
    border-radius: 5px;
    width: 80%;
    padding: 10px;
`;

export const Input = styled.input`
    width: 80%;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    padding: 10px;
`;

export const Button = styled.button({
        width: '85%',
        height: '40px',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '1em',
        backgroundColor: '#4285F4',
    },
    boxShadow,
    disableButton,
);