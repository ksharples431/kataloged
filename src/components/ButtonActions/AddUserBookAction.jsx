import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ButtonSuite from '../UI/ButtonSuite';
import { useAddUserBookMutation } from '../../store/api/api.slice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddUserBookAction = ({ bid }) => {
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.user.uid);
  const [addUserBook, { isLoading }] = useAddUserBookMutation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddBook = async () => {
    try {
      const userBook = await addUserBook({ bid, uid }).unwrap();
      console.log('Book added successfully:', userBook);
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
      disabled: isLoading,
    },
    {
      label: 'Back to book list',
      onClick: () => navigate('/books'),
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

AddUserBookAction.propTypes = {
  bid: PropTypes.string.isRequired,
};

export default AddUserBookAction;
