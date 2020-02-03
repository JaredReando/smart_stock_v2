import React from 'react';
import {Provider as FirebaseProvider} from './context/firebase.context';
import AppRouter from './routing/app_router';

const App = () => {
    return (
        <FirebaseProvider>
            <AppRouter />
        </FirebaseProvider>
    )
};

export default App;