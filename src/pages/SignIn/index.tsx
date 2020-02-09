import React, { useContext, useState } from 'react';
import { Context as FirebaseContext } from '../../context/firebase.context';
import { PasswordForgetLink } from '../PasswordForget';

import {
  Container,
  BigBold,
  Form,
  ErrorMessage,
  Input,
  Button,
} from './sign_in.styles';

const SignInPage = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const firebase = useContext(FirebaseContext);

  const {history} = props;
  const isInvalid = password === '' && email === '';

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError(null);
        sessionStorage.setItem('stockUser', 'true');
        history.push('/admin');
      })
      .catch((err: any) => {
        setError(err);
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
        {/*<SignUpLink />*/}
        <PasswordForgetLink />
      </Form>
    </Container>
  );
};

export default SignInPage;
