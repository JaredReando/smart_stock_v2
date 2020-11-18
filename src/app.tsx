import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './component_library/styles/global_styles';
import FirebaseProvider from './context/firebase.context';
import { Provider as AuthProvider } from './context/auth.context';
import AppRouter from './routing/app_router';
import { theme } from './component_library/styles/theme';

document.title = 'Smart Stock';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <FirebaseProvider>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </FirebaseProvider>
        </ThemeProvider>
    );
};

export default App;
