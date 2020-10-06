import { useContext } from 'react';
import { Context as FirebaseContext } from '../context/firebase.context';

export const useFirebase = () => {
    return useContext(FirebaseContext);
};
