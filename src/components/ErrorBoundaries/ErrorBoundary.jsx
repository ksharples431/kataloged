import PropTypes from 'prop-types';
import ErrorBoundaryInner from './ErrorBoundaryInner';
import useErrorHandler from '../../hooks/useErrorHandler';

// Custom fallback UI for errors
export const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Oops! Something went wrong.</h1>
    <p>{error.message}</p>
    <p>
      We&apos;re sorry for the inconvenience. Please try refreshing the
      page or contact support if the problem persists.
    </p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

const ErrorBoundary = ({ children, fallback }) => {
  const { error, handleError, clearError } = useErrorHandler();

  return (
    <ErrorBoundaryInner
      onError={handleError}
      fallback={
        fallback || (
          <ErrorFallback error={error} resetErrorBoundary={clearError} />
        )
      }>
      {children}
    </ErrorBoundaryInner>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;
