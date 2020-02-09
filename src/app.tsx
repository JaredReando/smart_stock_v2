import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global_styles';
import FirebaseProvider from "./context/firebase.context";
import AppRouter from './routing/app_router';
import { theme } from "./styles/theme";

const App = () => {
  return (
    <ThemeProvider
      theme={theme}
    >
      <GlobalStyle />
      <FirebaseProvider>
        <AppRouter />
      </FirebaseProvider>
    </ThemeProvider>
  );
};

export default App;
