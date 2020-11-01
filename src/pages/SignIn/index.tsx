import React, { useState } from 'react';
import { PasswordForgetLink } from '../PasswordForget';

import { Container, BigBold, Form, ErrorMessage, Input, Button } from './sign_in.styles';
import { setAuthUser } from '../../context/mutators/auth.mutators';
import { useFirebase } from '../../hooks/use_firebase_context';

const SignInPage = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const firebase = useFirebase();

    const { history } = props;
    const isInvalid = password === '' && email === '';

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError(null);
                setAuthUser(true);
                history.push('/admin');
            })
            .catch((err: any) => {
                setError(err.message);
            });
    };

    return (
        <Container>
            <Form>
                <BigBold fontSize="3em">SmartStock</BigBold>
                <BigBold fontSize="1.7em">Inventory, Simplified</BigBold>
                <BigBold fontSize="1em">Sign In</BigBold>
                <Input
                    name="email"
                    value={email}
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email Address"
                    autoComplete="off"
                />
                <Input
                    name="password"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button onClick={onSubmit} disabled={isInvalid}>
                    Log In
                </Button>
                {error && (
                    <p
                        style={{
                            padding: '10px',
                            width: '85%',
                            color: 'tomato',
                        }}
                    >
                        {error}
                    </p>
                )}
                {/*<SignUpLink />*/}
                {/*<PasswordForgetLink />*/}
            </Form>
        </Container>
    );
};

export default SignInPage;
