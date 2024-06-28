import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PageNav from '@/components/UI/PageNav.jsx';
import SearchBar from '@/components/UI/SearchBar';
import BookList from './components/BookList.jsx';
import LoadingSpinner from '@/components/UI/LoadingSpinner.jsx';
import { fetchBooks } from '@/store/books/books-thunks.js';

import styles from './BooksPage.module.css';

export default function BooksPage() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchBooks());
    }

    setFilteredBooks(books);
    console.log(books);
  }, [books, dispatch]);

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();

    if (!searchTerm) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercasedTerm) ||
        book.author.toLowerCase().includes(lowercasedTerm) ||
        book.genre.toLowerCase().includes(lowercasedTerm) ||
        book.seriesName.toLowerCase().includes(lowercasedTerm)
    );

    setFilteredBooks(filtered);
  };

  return (
    <div className={styles.page}>
      <PageNav />
      <SearchBar onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <p> {error}</p>}
      <div>
        {filteredBooks.length > 0 && !loading ? (
          <BookList books={filteredBooks} />
        ) : (
          <p className={styles.noResults}>
            No books found for your search.
          </p>
        )}
      </div>
    </div>
  );
}
