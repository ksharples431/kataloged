import PropTypes from 'prop-types';
import styles from './AuthorFilter.module.css'; 

const sortOptions = [
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: 'Recent', value: 'updatedAt' },
];

export default function AuthorFilter({ sortCriteria, onSortChange }) {
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

AuthorFilter.propTypes = {
  sortCriteria: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
