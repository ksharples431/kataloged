import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './GenreResults.module.css';

export default function BookResults({ books }) {
  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <div key={book.id} className={styles.bookItem}>
          <Link to={`/books/${encodeURIComponent(book.id)}`}>
            <img
              src={book.imagePath}
              alt={book.title}
              className={styles.bookImage}
            />
          </Link>
          <div className={styles.bookDetails}>
            <Link to={`/books/${encodeURIComponent(book.id)}`}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

BookResults.propTypes = {
  books: PropTypes.array.isRequired,
};
