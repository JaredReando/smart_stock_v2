import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const boxShadow = () => {
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
const disableButton = ({ disabled }: DynamicButtonProps) => {
    return {
        opacity: disabled ? 0.5 : 1,
    };
};

const PageWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BigBold = styled.p`
    font-weight: bold;
    ${props => css`font-size: ${props.fontSize};`}
`;

const Container = styled.div`
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

const ErrorMessage = styled.div`
text-align: center;
    background-color: tomato;
    line-height: 1.5em;
    color: #fff;
    border-radius: 5px;
    width: 80%;
    padding: 10px;
`;

const Input = styled.input`
    width: 80%;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    padding: 10px;
`;

const Button = styled.button({
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

const SignInPage = () => (
    <PageWrapper>
        <Container>
            <SignInForm />
            {/*<SignUpLink />*/}
            <PasswordForgetLink />
        </Container>
    </PageWrapper>
);
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <>
                <BigBold fontSize='3em'>SmartStock</BigBold>
                <BigBold fontSize='1.7em'>Inventory, Simplified</BigBold>
                <BigBold fontSize='1em'>Sign In</BigBold>
                <Input
                    name="email"
                    value={email}
                    type="text"
                    onChange={this.onChange}
                    placeholder="Email Address"
                    autocomplete='off'
                />
                <Input
                    name="password"
                    value={password}
                    type="password"
                    onChange={this.onChange}
                    placeholder="Password"
                />
                <Button
                    onClick={this.onSubmit}
                    disabled={isInvalid}
                >
                    Log In
                </Button>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </>
        )

    }
};

const SignInForm = compose(
    withFirebase,
    withRouter,
)(SignInFormBase);

export default SignInPage;