import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

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
    
    ${props => (!props.disabled ? 
        css`&:hover {
            background-color: lightgrey;
            color: red;
        }` : null
    )}
`;

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignUpLink />
        <PasswordForgetLink />
    </div>
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
            <Container>
                <h1>Sign In</h1>
                <Input
                    name="email"
                    value={email}
                    type="text"
                    onChange={this.onChange}
                    placeholder="Email Address"
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
                {error && <p>{error.message}</p>}
            </Container>
        )

    }
};

const SignInForm = compose(
    withFirebase,
    withRouter,
)(SignInFormBase);

export default SignInPage;