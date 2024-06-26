import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/auth/auth-thunks';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <Link to="/">
        <h1 className={styles.title}>My Book Tracker</h1>
      </Link>
      <div className={styles.headerRight}>
        <Link to="/add-book" className={styles.link}>
          Add More Books
        </Link>
        {!isLoggedIn && (
          <Link to="/auth/login" className={styles.link}>
            Login
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/auth/signup" className={styles.link}>
            Signup
          </Link>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className={styles.link}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
