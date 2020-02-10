import { useState, useEffect, useContext } from 'react';
import {Context as FirebaseContext} from '../context/firebase.context';

const useActiveUsers = () => {
    const firebase = useContext(FirebaseContext);
    const [users, setUsers] = useState({});

    useEffect(() => {
        firebase.users().on('value', (snap: any) => {
            console.log('users: ', snap.val())
        });

        return () => firebase.users().off();
    })
};

export default useActiveUsers;
