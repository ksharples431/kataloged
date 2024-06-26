import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import AuthorFilter from './AuthorFilter';
import AuthorResults from './AuthorResults';
import sortAuthors from '@/functions/sortAuthors.js';

export default function AuthorList({ authors }) {
  const [sortCriteria, setSortCriteria] = useState('lastName');

  const handleSortChange = useCallback((newSortCriteria) => {
    setSortCriteria(newSortCriteria);
  }, []);

  const sortedAuthors = useMemo(
    () => sortAuthors(authors, sortCriteria),
    [authors, sortCriteria]
  );

  return (
    <div>
      <AuthorFilter
        sortCriteria={sortCriteria}
        onSortChange={handleSortChange}
      />
      <AuthorResults authors={sortedAuthors} />
    </div>
  );
}

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
};
