import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url("/src/assets/bookcase.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        html: {
          backgroundImage: 'url("/src/assets/bookcase.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#415A77',
    },
    secondary: {
      main: '#778DA9',
    },
    background: {
      default: '#1B263B',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#E0E1DD',
      secondary: '#778DA9',
    },
  },
  customBackgrounds: {
    wood: 'url("/src/assets/wood.jpeg")',
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0D1b2A',
          minHeight: '100vh',
        },
        html: {
          backgroundColor: '#0D1b2A',
          minHeight: '100vh',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#415A77',
    },
    secondary: {
      main: '#284B63',
    },
    background: {
      default: '#1B263B',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D9D9D9',
    },
  },
});
