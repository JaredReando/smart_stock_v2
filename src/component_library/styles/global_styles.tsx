import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        //height: 100vh;
        margin: 0;
        padding: 0;
        height: fit-content;
    }
    html {
        box-sizing: border-box;
        height: -webkit-fill-available;
    }
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
    }

    *,
    *::after,
    *::before {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }
`;
