import createState from 'react-copy-write';
import { AuthContext } from '../constants/types';

const initAuth = () => {
    //check browser storage for 'auth' token.
    //TODO: make this listen to Firebase auth status
    //TODO: 'initAuth' only runs once after login... should check on each route access
    const user = sessionStorage.getItem('stockUser') || localStorage.getItem('stockUser');
    let auth: AuthContext = {};
    if (user) {
        //update context if storage token found
        auth = {
            validUser: true,
        };
    }
    return auth;
};
//when context is initialized, the user object is set according to token validation results.
//presumably, if no user exists ('{}'), one can be set at login using a context.consumer mutator to update the statue 'user' object.
const { Provider, Consumer, mutate } = createState<AuthContext>({
    validUser: !!localStorage.getItem('authUser'),
});

export { Provider, Consumer, mutate };
