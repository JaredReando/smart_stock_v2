import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useFirebase } from '../../hooks/use_firebase_context';

const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetFormBase />
    </div>
);

const PasswordForgetFormBase = () => {
    const firebase = useFirebase();
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(null);

    const onSubmit = event => {
        event.preventDefault();
        firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail('');
                setError(null);
            })
            .catch(err => {
                setError(err);
            });
    };

    const onChange = event => {
        setEmail(event.target.value);
    };

    const isInvalid = email === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>
            {error && <p>{error.message}</p>}
        </form>
    );
};
const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);
export default PasswordForgetPage;

export { PasswordForgetLink };
