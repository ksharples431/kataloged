import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './PageNav.module.css';

const usePreviousUrl = () => {
  const location = useLocation();
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    setPrevUrl(location.pathname);
  }, [location]);

  return prevUrl;
};

const Navbar = () => {
  const prevUrl = usePreviousUrl();
  const navigate = useNavigate();

   const handleBackClick = () => {
     if (prevUrl !== null && prevUrl !== '/') {
       navigate(-1); 
     } else {
       navigate('/'); 
     }
   };

  return (
    <nav className={styles.navbar}>
      <Link className={`${styles.navLinkHome} ${styles.navLink}`} onClick={handleBackClick}>
        {`<- Back`}
      </Link>
      <Link to="/" className={styles.navLink}>
        Home
      </Link>
      <Link to="/books" className={styles.navLink}>
        Books
      </Link>
      <Link to="/authors" className={styles.navLink}>
        Authors
      </Link>
      <Link to="/genres" className={styles.navLink}>
        Genres
      </Link>
      <Link to="/series" className={styles.navLink}>
        Series
      </Link>
      <Link to="/queue" className={styles.navLink}>
        Queue
      </Link>
      <Link to="/account" className={styles.navLink}>
        Account
      </Link>
    </nav>
  );
};

export default Navbar;
