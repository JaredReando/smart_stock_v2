import createState from 'react-copy-write';

export type Permission = true | false;
export interface AuthContext {
  user?: Permission;
}

const initAuth = () => {
  //check browser storage for 'auth' token.
  const user =
    sessionStorage.getItem('stockUser') || localStorage.getItem('stockUser');
  let auth: AuthContext = {};
  if (user) {
    //update context if storage token found
    auth = {
      user: true,
    };
  }
  return auth;
};
//when context is initialized, the user object is set according to token validation results.
//presumably, if no user exists ('{}'), one can be set at login using a context.consumer mutator to update the statue 'user' object.
const { Provider, Consumer, mutate } = createState<AuthContext>(initAuth());

export { Provider, Consumer, mutate };