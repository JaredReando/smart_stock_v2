import createState from 'react-copy-write';
import Firebase from '../components/Firebase';

const firebase = new Firebase();

const { Provider, Consumer, mutate } = createState(firebase);

export { Provider, Consumer, mutate };

