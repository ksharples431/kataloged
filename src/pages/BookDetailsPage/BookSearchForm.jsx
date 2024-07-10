import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBooks } from '../../store/books/booksThunks';

function BookSearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { searchResults, status, error } = useSelector(
    (state) => state.books
  );

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchBooks(searchTerm));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter book title"
        />
        <button type="submit">Search</button>
      </form>
      {status === 'loading' && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}
      {searchResults.map((book) => (
        <div key={book.id || book.title}>
          <h3>{book.title}</h3>
          <p>By: {book.authors?.join(', ')}</p>
          {/* Display other book details */}
        </div>
      ))}
    </div>
  );
}

export default BookSearchForm;
