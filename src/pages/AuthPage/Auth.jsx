import PropTypes from 'prop-types';

import LoginForm from './components/Login';
import SignupForm from './components/Signup';

import styles from './Auth.module.css';

export default function AuthPage({ authMode }) {

  const renderForm = () => {
    switch (authMode) {
      case 'login':
        return <LoginForm />;
      case 'signup':
        return <SignupForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <h1>Auth Page</h1>
      {renderForm()}
    </div>
  );
}

AuthPage.propTypes = {
  authMode: PropTypes.string
};
