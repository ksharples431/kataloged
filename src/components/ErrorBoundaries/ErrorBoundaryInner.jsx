import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ErrorBoundaryInner.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundaryInner;
