import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CCGrid from '@/pages/HomePage/components/CC-Grid.jsx';
import { fetchBooks } from '@/store/books/books-thunks.js';

import styles from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <CCGrid />
      </div>
    </div>
  );
}
