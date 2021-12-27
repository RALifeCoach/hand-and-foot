import { createTheme, Color, colors } from '@mui/material';

export const themeColors: { [key: string]: Color } = {
  primary: {
    50: '#E7E7E7',
    100: '#C1C7EA',
    200: '#98A3DC',
    300: '#6E80CF',
    400: '#4D64C5',
    500: '#2549BA',
    600: '#1F41B0',
    700: '#1137A5',
    800: '#060606',
    900: '#000000',
    A100: '',
    A200: '',
    A400: '',
    A700: '',
  },
  secondary: {
    50: '#DFF3EE',
    100: '#B0E2D2',
    200: '#7DCFB6',
    300: '#4BBB9A',
    400: '#2BAB86',
    500: '#159B74',
    600: '#118D69',
    700: '#0C7D5A',
    800: '#056D4D',
    900: '#025133',
    A100: '',
    A200: '',
    A400: '',
    A700: '',
  },
  brand: {
    50: '#FF6319',
    100: '#FF6319',
    200: '#FF6319',
    300: '#FF6319',
    400: '#FF6319',
    500: '#FF6319',
    600: '#FF6319',
    700: '#FF6319',
    800: '#FF6319',
    900: '#FF6319',
    A100: '',
    A200: '',
    A400: '',
    A700: '',
  },
  gray: {
    50: '#F2F2F2',
    100: '#F2F2F2',
    200: '#F2F2F2',
    300: '#F2F2F2',
    400: '#F2F2F2',
    500: '#D9D9D6',
    600: '#D9D9D6',
    700: '#D9D9D6',
    800: '#D9D9D6',
    900: '#63666A',
    A100: '',
    A200: '',
    A400: '',
    A700: '',
  },
  blue: {
    50: '#8CC8CA',
    100: '#8CC8CA',
    200: '#8CC8CA',
    300: '#8CC8CA',
    400: '#8CC8CA',
    500: '#A4B3BD',
    600: '#A4B3BD',
    700: '#A4B3BD',
    800: '#A4B3BD',
    900: '#667F91',
    A100: '',
    A200: '',
    A400: '',
    A700: '',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary[900],
      light: themeColors.primary[200],
    },

    secondary: {
      main: themeColors.gray[500],
      light: themeColors.gray[50],
      contrastText: themeColors.gray[900],
    },

    background: {
      default: '#F6F7FB',
    },
  },

  zIndex: {
    snackbar: 2000,
  },

  typography: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    h1: {
      fontSize: 30,
      fontWeight: 900,
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 24,
      lineHeight: '29px',
      color: '#000000',
    },

    h3: {
      color: '#8B8B8B',
      fontSize: 9,
      fontWeight: 500,
      letterSpacing: '1.5px',
      lineHeight: '16px',
      textTransform: 'uppercase',
    },

    h4: {
      color: '#000000',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.25px',
      lineHeight: '16px',
    },

    h5: {
      color: '#8B8B8B',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '0.25px',
      lineHeight: '28px',
    },
    h6: {
      color: '#8B8B8B',
      fontSize: 9,
      fontWeight: 500,
      letterSpacing: '1.5px',
      lineHeight: '16px',
      textTransform: 'uppercase',
    },

    body1: {
      color: '#000000',
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: '0.25px',
      lineHeight: '28px',
    },

    body2: {
      color: '#000000',
      fontSize: 12,
      letterSpacing: '0.25px',
      lineHeight: '22px',
    },

    caption: {
      fontSize: 14,
      fontStyle: 'italic',
    },
    overline: {
      fontSize: 12,
      letterSpacing: 0,
      textTransform: 'none',
      color: colors.grey[500],
    },

    subtitle1: {
      color: 'inherit',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '0.5px',
      lineHeight: '28px',
    },

    subtitle2: {
      color: '#000000',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '0.5px',
      lineHeight: '28px',
    },
  },
});

export default theme;
