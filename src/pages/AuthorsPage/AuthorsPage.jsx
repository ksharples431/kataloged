import { useState } from 'react';
import { useSelector } from 'react-redux';

import PageNav from '@/components/UI/PageNav.jsx';
import SearchBar from '@/components/UI/SearchBar.jsx';
import AuthorList from './components/AuthorList.jsx';
import LoadingSpinner from '@/components/UI/LoadingSpinner.jsx';

import getAuthorsFromBooks from '@/functions/getAuthorsFromBooks.js';
import styles from './AuthorsPage.module.css';


export default function AuthorsPage() {
  const { books, loading, error } = useSelector((state) => state.books);
  const authors = getAuthorsFromBooks(books);
  const [filteredAuthors, setFilteredAuthors] = useState(authors);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredAuthors(authors);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(lowercasedTerm) ||
        author.lastName.toLowerCase().includes(lowercasedTerm) 

    );

    setFilteredAuthors(filtered);
  };

  return (
    <div className={styles.page}>
      <PageNav />
      <SearchBar text="Search authors..." onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      <div>
        <AuthorList authors={filteredAuthors} />
      </div>
    </div>
  );
}
