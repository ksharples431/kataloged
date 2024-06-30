import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

   const toggleTheme = () => {
     setIsDarkMode((prevMode) => !prevMode);
   };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};