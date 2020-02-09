import React, { createContext } from "react";
import Firebase from '../api/Firebase';

export const Context = createContext<any>({});

const FirebaseProvider: React.FC = ({children}) => {
    return (
        <Context.Provider value={new Firebase()}>
            {children}
        </Context.Provider>
    )
};

export default FirebaseProvider

