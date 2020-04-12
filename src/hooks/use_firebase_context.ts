import { useContext } from 'react';
import { Context as FirebaseContext } from '../context/firebase.context';

export const useFirebaseContext = () => {
    return useContext(FirebaseContext)
};