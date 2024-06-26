import PropTypes from 'prop-types';
import styles from './BookFilter.module.css'; 

const sortOptions = [
  { label: 'Title', value: 'title' },
  { label: 'Author', value: 'author' },
  { label: 'Recent', value: 'updatedAt' },
];

export default function BookFilter({ sortCriteria, onSortChange }) {
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

BookFilter.propTypes = {
  sortCriteria: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
