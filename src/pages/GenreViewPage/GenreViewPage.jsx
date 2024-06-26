import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageNav from '@/components/UI/PageNav';
import SeriesGrid from './components/SeriesGrid.jsx';
import GenreResults from './components/GenreResults.jsx';
import styles from './GenreViewPage.module.css';

export default function GenreViewPage() {
  const { genre } = useParams();
  const { books, loading, error } = useSelector((state) => state.books);

  const filteredBooks = books.filter(
    (book) =>
      book.genre.toLowerCase().trim() === genre.toLowerCase().trim()
  );

  const seriesWithBooks = filteredBooks
    .filter((book) => book.seriesName !== undefined)
    .reduce((seriesMap, book) => {
      const seriesName = book.seriesName.toLowerCase().trim();
      if (!seriesMap[seriesName]) {
        seriesMap[seriesName] = {
          seriesName: seriesName.toUpperCase(),
          books: [],
          seriesImage: book.imagePath || '',
        };
      }
      seriesMap[seriesName].books.push(book);
      return seriesMap;
    }, {});

  const series = Object.values(seriesWithBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.home}>
      <PageNav />
      <h1>{genre}</h1>
      {Object.keys(seriesWithBooks).length > 0 ? (
        <div>
          <h2>Series</h2>
          <SeriesGrid items={series} />
        </div>
      ) : (
        <p>No series found for this genre.</p>
      )}
      <div>
        <h2>All Books</h2>
        <GenreResults books={filteredBooks} />
      </div>
    </div>
  );
}
