import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './component_library/styles/global_styles';
import AppRouter from './routing/app_router';
import { theme } from './component_library/styles/theme';
import { useAuthUser } from './hooks/use_auth_user';

document.title = 'Smart Stock';

const App = () => {
    const { authUser, loading } = useAuthUser();
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {loading && <h1>loading</h1>}
            {!loading && <AppRouter authUser={authUser} />}
        </ThemeProvider>
    );
};

export default App;
