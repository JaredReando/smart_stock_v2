const shadows = {
  inner:
    'inset 0px 2px 2px rgba(44, 44, 44, 0.24), inset 0px 0px 2px rgba(0, 0, 0, 0.12)',
  small: '0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)',
  large: '0px 0px 6px rgba(0, 0, 0, 0.12), 0px 6px 6px rgba(0, 0, 0, 0.24)',
};

const colors = {
  paleGrey: '#f4f5f7',
  lightGrey: '#ECECEC',
  grey: '#C4C4C4',
  darkGrey: '#ABABAB',
  lightGreen: 'lightgreen',
  black: '#2C2C2C',
  azure: '#008CFF',
  white: '#FBFBFB',
  tomato: '#DC3535',
  turquoise: '#25E5E5',
  transparent: 'rgba(0,0,0,0)',
};

const fontSizes = ['.75rem', '1rem', '1.25rem', '1.8rem'];

const text = {
  headingFontFamily: "'Source Sans Pro', sans-serif",
  bodyFontFamily: "'Source Sans Pro', sans-serif",
  color: {
    light: colors.white,
    medium: colors.darkGrey,
    dark: colors.black,
    tomato: colors.tomato,
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
  text,
  fontSizes,
  space,
  radii,
};
