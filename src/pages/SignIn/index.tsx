import React, { useState } from 'react';
import { Container, BigBold, Form, Input } from './sign_in.styles';
import { useFirebase } from '../../hooks/use_firebase_context';
import { Box, Row, Column } from '../../component_library/styles/layout';
import { AppText } from '../../component_library/styles/typography';
import { Button } from '../../component_library/styles/buttons';

const SignInPage = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const firebase = useFirebase();

    const { history } = props;

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        firebase
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError(null);
                history.push('/admin');
            })
            .catch((err: any) => {
                setError(err.message);
            });
    };

    return (
        <Container>
            <Form>
                <Row mb={5} alignItems="center">
                    <Box mr={4}>
                        <img
                            src="https://img.icons8.com/metro/64/000000/fork-lift.png"
                            alt="forklift"
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Box>
                    <Column alignItems="center">
                        <BigBold fontSize="3em">SmartStock</BigBold>
                        <BigBold fontSize="1.5em">Inventory, Simplified</BigBold>
                    </Column>
                </Row>
                <Column width="100%">
                    <Column mb={3}>
                        <AppText ml={2} bold>
                            Email
                        </AppText>
                        <Input
                            name="email"
                            value={email}
                            type="text"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="user@email.com"
                            autoComplete="off"
                        />
                    </Column>
                    <Column mb={4}>
                        <AppText ml={2} bold>
                            Password
                        </AppText>
                        <Input
                            name="password"
                            value={password}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </Column>
                </Column>
                <Button width="100%" onClick={onSubmit}>
                    Sign In
                </Button>
                <Box height="50px" mt={4}>
                    {error && (
                        <AppText color="red" bold>
                            {error}
                        </AppText>
                    )}
                </Box>
            </Form>
        </Container>
    );
};

export default SignInPage;
