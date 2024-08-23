import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './theme/ThemeContext.jsx';
import App from './App.jsx';
import store from './store/index.js';
import ErrorBoundary, {
  ErrorFallback,
} from './components/ErrorBoundaries/ErrorBoundary.jsx';
import { logError } from './utils/errorLogger';
import './index.css';

// For unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, { type: 'unhandledRejection' });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <App />
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
