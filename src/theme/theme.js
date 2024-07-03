import { createTheme } from '@mui/material/styles';

export default createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
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
      main: '#284B63',
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
