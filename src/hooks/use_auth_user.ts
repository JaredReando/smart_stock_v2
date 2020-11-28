import { useState, useEffect } from 'react';
import { useFirebase } from './use_firebase_context';

export const useAuthUser = () => {
    const firebase = useFirebase();
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = firebase.auth.onAuthStateChanged((user: any) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
            setLoading(false);
            console.log('firebase authUser change: ', user);
        });
        return () => unsubscribe();
    }, [firebase.auth, setLoading]);

    return { authUser, loading };
};
