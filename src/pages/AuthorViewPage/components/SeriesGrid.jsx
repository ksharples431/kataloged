import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@/components/UI/Button';
import styles from './SeriesGrid.module.css';

export default function SeriesGrid({ items }) {
  return (
    <div>
      {items.length > 0 ? (
        <div className={styles.bookList}>
          {items.map((item, index) => (
            <div key={index} className={styles.bookItem}>
              <Link to={`/books/${encodeURIComponent(item.seriesName)}`}>
                <img
                  src={item.seriesImage}
                  alt={item.seriesName}
                  className={styles.bookImage}
                />
              </Link>
              <Button type="button">{item.seriesName}</Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No series found for this author.</p>
      )}
    </div>
  );
}

SeriesGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      seriesName: PropTypes.string.isRequired,
      seriesImage: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
    })
  ).isRequired,
};
