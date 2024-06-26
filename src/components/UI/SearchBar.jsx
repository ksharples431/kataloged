import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, text }) {
  const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      onSearch(newSearchTerm);
    };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        placeholder={text || "Search by title or author..."}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  text: PropTypes.string,
};