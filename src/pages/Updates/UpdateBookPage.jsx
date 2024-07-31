import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '../../store/api/apiSlice';

const UpdateBookPage = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, isLoading, isError } = useGetBookByIdQuery(bid);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    imagePath: '',
    description: '',
    isbn: '',
  });

useEffect(() => {
  if (data && data.original) {
    const book = data.original;
    setFormData({
      title: book.title || '',
      author: book.author || '',
      genre: book.genre || '',
      imagePath: book.imagePath || '',
      description: book.description || '',
      isbn: book.isbn || '',
    });
  }
}, [data]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook({ bid, ...formData }).unwrap();
      navigate(`/books/${bid}?update=success`);
    } catch (err) {
      console.error('Failed to update book:', err);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading book data</Typography>;

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.main.lightSlateBlue,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.main.slateBlue,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.main.slateBlue,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.main.lightSlateBlue,
      '&.Mui-focused': {
        color: theme.palette.main.slateBlue,
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.main.lightSlateBlue,
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      {isLoading && <CircularProgress />}
      <Typography
        variant="h4"
        sx={{ mb: 3, color: theme.palette.main.lightSlateBlue }}>
        Update {formData.title || 'Book'}
      </Typography>
      {Object.entries(formData).map(([field, value]) => (
        <TextField
          key={field}
          fullWidth
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          name={field}
          value={value}
          onChange={handleChange}
          margin="normal"
          disabled={isLoading}
          sx={textFieldStyle}
        />
      ))}
      <Box sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isUpdating}
          sx={{
            bgcolor: theme.palette.main.slateBlue,
            '&:hover': {
              bgcolor: theme.palette.main.darkSlateBlue,
            },
          }}>
          Update Book
        </Button>
        <Button
          onClick={() => navigate(`/books/${bid}`)}
          sx={{
            ml: 2,
            color: theme.palette.main.lightSlateBlue,
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
            },
          }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateBookPage;
