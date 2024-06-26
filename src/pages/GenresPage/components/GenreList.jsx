import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import GenreFilter from './GenreFilter';
import GenreResults from './GenreResults';
import sortGenres from '@/functions/sortGenres.js';

export default function GenreList({ genres }) {
  const [sortCriteria, setSortCriteria] = useState('genreName');

  const handleSortChange = useCallback((newSortCriteria) => {
    setSortCriteria(newSortCriteria);
  }, []);

  const sortedGenres = useMemo(
    () => sortGenres(genres, sortCriteria),
    [genres, sortCriteria]
  );

  return (
    <div>
      <GenreFilter
        sortCriteria={sortCriteria}
        onSortChange={handleSortChange}
      />
      <GenreResults genres={sortedGenres} />
    </div>
  );
}

GenreList.propTypes = {
  genres: PropTypes.array.isRequired,
};
