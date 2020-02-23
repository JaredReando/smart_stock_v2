import { useState, useEffect, useContext } from 'react';
import {Context as FirebaseContext} from '../context/firebase.context';

const useActiveUsers = () => {
    const firebase = useContext(FirebaseContext);
    const [users, setUsers] = useState({});

    useEffect(() => {
        firebase.users().on('value', (snap: any) => {
            const users = snap.val();
            setUsers(users);
        });
        return () => firebase.users().off();
    }, [firebase]);
    return users;
};

export default useActiveUsers;
