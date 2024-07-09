import PropTypes from 'prop-types';
import ResponsiveBookCard from '../components/BookCard/ResponsiveBookCard.jsx';

const BookList = ({ books }) => (
  <div>
    {books.map((book) => (
      <ResponsiveBookCard key={book.bid} book={book} />
    ))}
  </div>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
    })
  ).isRequired,
};

export default BookList;


