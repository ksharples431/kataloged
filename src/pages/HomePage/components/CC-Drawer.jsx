import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CCButton from './CC-Button.jsx';

import styles from './CC-Drawer.module.css';

export default function CCDrawer({ address, title }) {
  return (
    <div className={styles.drawerContainer}>
      <Link to={address}>
        <div className={styles.headerBorder}>
          <div className={styles.drawerHeader}>
            <h2>{title}</h2>
          </div>
        </div>
      </Link>
      <div className={styles.drawerContent}>
        <Link to={address}>
          <CCButton />
        </Link>
      </div>
    </div>
  );
}

CCDrawer.propTypes = {
  address: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
