import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, children, type }) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = PropTypes.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
};

export default Button;
