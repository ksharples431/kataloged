import { useState } from 'react';
import { useSelector } from 'react-redux';

import PageNav from '@/components/UI/PageNav.jsx';
import SearchBar from '@/components/UI/SearchBar.jsx';
import GenreList from './components/GenreList.jsx';
import LoadingSpinner from '@/components/UI/LoadingSpinner.jsx';

import getGenresFromBooks from '@/functions/getGenresFromBooks.js';
import styles from './GenresPage.module.css';


export default function GenresPage() {
  const { books, loading, error } = useSelector((state) => state.books);
  const genres = getGenresFromBooks(books);
  const [filteredGenres, setFilteredGenres] = useState(genres);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredGenres(genres);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = genres.filter(
      (genre) =>
        genre.genreName.toLowerCase().includes(lowercasedTerm) 
    );

    setFilteredGenres(filtered);
  };

  if (filteredGenres.length === 0) {
    setFilteredGenres(genres);
  }

  return (
    <div className={styles.page}>
      <PageNav />
      <SearchBar text="Search genres..." onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      <div><GenreList genres={filteredGenres} /></div>
    </div>
  );
}
