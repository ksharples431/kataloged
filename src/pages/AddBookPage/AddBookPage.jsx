import PageNav from '@/components/UI/PageNav.jsx';
import AddBookForm from './components/AddBookForm.jsx';

import styles from './AddBookPage.module.css';

export default function BooksPage() {
  return (
    <div className={styles.page}>
      <PageNav />
      <AddBookForm />
    </div>
  );
}
