import PropTypes from 'prop-types';
import styles from './GenreFilter.module.css';

const sortOptions = [
  { label: 'A-Z', value: 'genreName' },
  { label: 'Z-A', value: 'genreNameDesc'},
  { label: 'Recent', value: 'updatedAt'},
];

export default function GenreFilter({ sortCriteria, onSortChange }) {
  return (
    <div className={styles.sortContainer}>
      {sortOptions.map((option) => (
        <span
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`${styles.sortOption} ${
            sortCriteria === option.value ? styles.activeSortOption : ''
          }`}>
          {option.label}
        </span>
      ))}
    </div>
  );
}

GenreFilter.propTypes = {
  sortCriteria: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
