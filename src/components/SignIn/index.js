import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    min-height: 200px;
    max-height: 400px;
    border: 1px solid black;
    
    & * {
        margin: 10px;
    }
    
`;

const Input = styled.input`
    width: 80%;
`;

const Button = styled.button`
    width: 80%;
    height: 30px;
    
    &:hover {
        background-color: lightgrey;
        color: red;
    }
`;

const SignIn = () => {
    let emailRef = React.createRef();
    let passRef = React.createRef();

    const handleSubmit = () => {
        console.log('email: ', emailRef.current.value);
        console.log('password: ', passRef.current.value);
    };

    return (
        <Container>
            <h1>Sign In</h1>
            <Input
                ref={emailRef}
            />
            <Input
                ref={passRef}
            />
            <Button
                onClick={handleSubmit}
            >
                Log In
            </Button>
        </Container>
    )
};

export default SignIn;