import { type ThemeOptions, createTheme } from '@mui/material';

import { Roboto } from 'next/font/google';

import { colors } from './colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const themeOptions: ThemeOptions = {
  spacing: (factor: number) => `${1 * factor}rem`,
  palette: {
    primary: {
      main: colors.primary,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 482,
      md: 770,
      lg: 1081,
      xl: 1281,
      xxl: 1400,
    },
  },
};

export const defaultTheme = createTheme(themeOptions);
