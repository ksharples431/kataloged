import PropTypes from 'prop-types';
import styles from './BookView.module.css';

const BookView = ({ book }) => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={book.imagePath}
            alt={book.title}
            className={styles.image}
          />
        </div>
        <div className={styles.detailsCard}>
          <div className={styles.detailsContainer}>
            <div>
              <h2 className={styles.title}>{book.title}</h2>
              <p className={styles.description}>{book.author}</p>
              <p className={styles.description}>{book.genre}</p>
              <p className={styles.description}>
                {book.seriesName} - Book {book.seriesNumber}
              </p>
              <p className={styles.description}>{book.description}</p>
            </div>
          </div>
          <div className={styles.detailsContainer}>
            <p className={styles.description}>Format: {book.format}</p>
            <p className={styles.description}>
              Where to get: {book.whereToGet}
            </p>
            <p className={styles.description}>Progress: {book.progress}</p>
            <p className={styles.description}>
              Owned: {book.owned ? 'Yes' : 'No'}
            </p>
            <p className={styles.description}>
              Favorite: {book.favorite ? 'Yes' : 'No'}
            </p>
            <p className={styles.description}>
              Wishlist: {book.wishlist ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

BookView.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookView;
