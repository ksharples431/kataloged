import { createTheme } from '@mui/material/styles';

export default createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url("/bookcase.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        html: {
          backgroundImage: 'url("/bookcase.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
  },
  palette: {
    main: {
      white: '#FFFFFF', // White
      lightSlateBlue: '#778DA9', // Light Slate Blue
      slateBlue: '#415A77', // Slate Blue
      slateBlue2: '#778DA9', // Slate Blue
      darkSlateBlue: '#284B63', // Dark Slate Blue
      veryLightGray: '#F0F1F3', // Very Light Gray
      lightGray: '#E0E1DD', // Light Gray
      darkGray: '#A0A1A3', // Dark Gray
      mediumGray: '#C0C1C3', // Medium Gray
      navy: '#1B263B', // Dark Navy
    },
    primary: {
      main: '#415A77', // Slate Blue
      dark: '#284B63', // Dark Slate Blue
      light: '#778DA9', // Light Slate Blue
    },
    secondary: {
      main: '#E0E1DD', // Light Gray
      dark: '#B0B1B3', // Medium Gray
      light: '#F0F1F3', // Very Light Gray
    },
    background: {
      default: '#1B263B', // Dark Navy
      paper: '#F5F5F5', // Light Gray
    },
    surface: {
      main: '#E0E1DD', // Light Gray
      dark: '#C0C1C3', // Medium Gray
      light: '#F0F1F3', // Very Light Gray
    },
    border: {
      default: '#C0C1C3', // Medium Gray
      light: '#E0E1DD', // Light Gray
      dark: '#A0A1A3', // Dark Gray
    },
    text: {
      primary: '#FFFFFF', // White
      secondary: '#778DA9', // Slate Blue
      disabled: '#778DA9', // Light Slate Blue
      hint: '#B0B1B3', // Medium Gray
    },
    error: {
      main: '#D32F2F',
      dark: '#9A0007',
      light: '#FF6659',
    },
    warning: {
      main: '#FFA000',
      dark: '#C67100',
      light: '#FFD54F',
    },
    success: {
      main: '#388E3C',
      dark: '#00600F',
      light: '#81C784',
    },
    info: {
      main: '#0288D1',
      dark: '#01579B',
      light: '#4FC3F7',
    },
  },
  customBackgrounds: {
    wood: 'url("/wood.jpeg")',
  },
});
