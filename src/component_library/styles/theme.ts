const shadows = {
    inner: 'inset 0px 2px 2px rgba(44, 44, 44, 0.24), inset 0px 0px 2px rgba(0, 0, 0, 0.12)',
    small: '0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)',
    large: '0px 0px 6px rgba(0, 0, 0, 0.12), 0px 6px 6px rgba(0, 0, 0, 0.24)',
};

const colors = {
    primary: 'rgb(15, 157, 88)',
    paleGrey: '#f4f5f7',
    lightGrey: '#ECECEC',
    grey: '#C4C4C4',
    darkGrey: '#ABABAB',
    green: 'rgb(15, 157, 88)',
    lightgreen: 'lightgreen',
    black: '#2C2C2C',
    blue: 'rgb(66, 133, 244)',
    white: '#FBFBFB',
    tomato: '#DC3535',
    turquoise: '#25E5E5',
    transparent: 'rgba(0,0,0,0)',
};

export const focus = {
    outline: {
        outline: '#76c1ff auto 3px',
    },
    shadow: {
        boxShadow: '0px 0px 1px 3px #76c1ff',
    },
};

const buttons = {
    primary: {
        color: colors.white,
        backgroundColor: colors.green,
        border: 'none',
        boxShadow: shadows.small,
        ':hover': {
            boxShadow: shadows.large,
        },
        ':active': {
            backgroundColor: colors.lightgreen,
        },
        ':disabled': {
            cursor: 'not-allowed',
            backgroundColor: colors.darkGrey,
            ':hover': {
                boxShadow: shadows.small,
            },
        },
    },
    secondary: {
        color: colors.green,
        backgroundColor: colors.white,
        border: 'none',
        ':hover': {
            backgroundColor: colors.white,
        },
        ':active': {
            borderColor: colors.black,
            color: colors.white,
            backgroundColor: colors.lightGrey,
        },
        ':disabled': {
            color: colors.darkGrey,
            backgroundColor: colors.darkGrey,
            borderColor: colors.darkGrey,
        },
    },
    link: {
        display: 'inline-block',
        width: 'unset',
        boxShadow: 'none',
        background: 'none',
        padding: '0',
        border: '0',
        borderRadius: '0',
        height: 'unset',
        margin: '0',
        color: colors.blue,
        fontWeight: '600',
        cursor: 'pointer',
        ':hover, :active, :focus': {
            textDecoration: 'underline',
            background: 'none',
            boxShadow: 'none',
            borderRadius: '0',
        },
        ':focus-within': focus.shadow,
    },
};

const fontSizes = ['.75rem', '1rem', '1.25rem', '1.8rem'];

const text = {
    headingFontFamily: "'Roboto', sans-serif",
    bodyFontFamily: "'Roboto', sans-serif",
    color: {
        light: colors.white,
        medium: colors.darkGrey,
        dark: colors.black,
        red: colors.tomato,
        inherit: 'inherit',
    },
    size: {
        small: '.75rem',
        medium: '1rem',
        large: '1.25rem',
        xlarge: '1.8rem',
    },
};

const space = [0, 2, 4, 8, 16, 32, 64];

const radii = [0, 5, 10, 15, 20];

export const theme = {
    shadows,
    colors,
    buttons,
    text,
    fontSizes,
    space,
    radii,
};
