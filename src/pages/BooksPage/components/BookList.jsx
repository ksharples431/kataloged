import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import BookFilter from './BookFilter.jsx';
import BookResults from './BookResults.jsx';
import sortBooks from '@/functions/sortBooks.js';

export default function BookList({ books }) {
  const [sortCriteria, setSortCriteria] = useState('title');

  const handleSortChange = useCallback((newSortCriteria) => {
    setSortCriteria(newSortCriteria);
  }, []);

  const sortedBooks = useMemo(
    () => sortBooks(books, sortCriteria),
    [books, sortCriteria]
  );

  return (
    <div>
      <BookFilter
        sortCriteria={sortCriteria}
        onSortChange={handleSortChange}
      />
      <BookResults books={sortedBooks} />
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string,
      seriesName: PropTypes.string,
      updatedAt: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};
