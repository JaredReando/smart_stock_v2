import React from 'react';
import { ThemeProvider} from "styled-components";
import { GlobalStyle} from "./styles/global_styles";
import {Provider as FirebaseProvider} from './context/firebase.context';
import AppRouter from './routing/app_router';

const App = () => {
    return (
        <ThemeProvider theme={{colors: {red: 'tomato', green: 'lightgreen'}, space: [0, 2, 4, 8, 12, 20]}}>
            <GlobalStyle />
            <FirebaseProvider>
                <AppRouter />
            </FirebaseProvider>
        </ThemeProvider>
    )
};

export default App;