import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

import ButtonSuite from '../../../components/UI/ButtonSuite';
import {
  useAddUserBookMutation,
  useAddBookMutation,
  useCheckBookExistsMutation,
} from '../../../store/api/apiSlice';

const SearchActions = ({ bid }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [book, setBook] = useState(null);
  const [addUserBook] = useAddUserBookMutation();
  const [addBook] = useAddBookMutation();
  const [checkBookExists] = useCheckBookExistsMutation();

  const uid = useSelector((state) => state.auth.user?.uid);
  const {
    dbSearchResults,
    googleSearchResults,
    generalSearchResults,
    userSearchResults,
  } = useSelector((state) => state.search);

  useEffect(() => {
    if (bid) {
      const foundBook =
        dbSearchResults.find((b) => b.bid === bid) ||
        googleSearchResults.find((b) => b.bid === bid) ||
        generalSearchResults.find((b) => b.bid === bid) ||
        userSearchResults.find((b) => b.bid === bid);

      setBook(foundBook || null);
    }
  }, [
    dbSearchResults,
    googleSearchResults,
    generalSearchResults,
    userSearchResults,
    bid,
  ]);

  const handleAddBook = async () => {
    if (!book) {
      setError('Book details not found');
      return;
    }

    try {
      const { data: bookInDb } = await checkBookExists(book.bid).unwrap();
      let finalBook;
      if (bookInDb.exists === false) {
        const addBookResult = await addBook(book).unwrap();
        finalBook = addBookResult.data.book;
      } else {
        finalBook = bookInDb.book;
      }

      const userBook = await addUserBook({
        bid: finalBook.bid,
        uid,
        kataloged: false,
      }).unwrap();

      console.log(
        'Book added to user library:',
        userBook.data.userBook.ubid
      );
      setSuccess(true);
    } catch (err) {
      console.error('Failed to add book:', err);
      setError(err.data?.message || 'Failed to add book');
    }
  };

  const buttons = [
    {
      label: 'Add to my library',
      onClick: handleAddBook,
      icon: <FavoriteIcon />,
      color: 'secondary',
      disabled: !book,
    },
    {
      label: 'Back to search list',
      onClick: () => navigate('/books/add'),
      icon: <ArrowBackIcon />,
      color: 'primary',
    },
  ];

  return (
    <>
      <ButtonSuite buttons={buttons} />
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}>
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}>
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}>
          Book added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

SearchActions.propTypes = {
  bid: PropTypes.string.isRequired,
};

export default SearchActions;
