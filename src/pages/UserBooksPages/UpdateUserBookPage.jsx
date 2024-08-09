import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useUpdateUserBookMutation } from '../../store/api/apiSlice';
import { useUserBookDetails } from '../UserBooksPages/userBookHooks/useUserBookDetails';

const UpdateUserBookPage = () => {
  const { ubid } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const { userBook, isLoading, isError, error } = useUserBookDetails(ubid);
  const [updateUserBook, { isLoading: isUpdating }] =
    useUpdateUserBookMutation();

  const [formData, setFormData] = useState({
    favorite: false,
    kataloged: false,
    owned: false,
    wishlist: false,
    title: '',
    author: '',
    genre: '',
    imagePath: '',
    description: '',
    isbn: '',
    format: '',
    progress: '',
    whereToGet: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (userBook) {
      setFormData({
        favorite: userBook.favorite || false,
        kataloged: userBook.kataloged || false,
        owned: userBook.owned || false,
        wishlist: userBook.wishlist || false,
        title: userBook.title || '',
        author: userBook.author || '',
        genre: userBook.genre || '',
        imagePath: userBook.imagePath || '',
        description: userBook.description || '',
        isbn: userBook.isbn || '',
        format: userBook.format || '',
        progress: userBook.progress || '',
        whereToGet: userBook.whereToGet || '',
      });
    }
  }, [userBook]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear the error when the user starts typing
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.author.trim()) errors.author = 'Author is required';
    if (!formData.format) errors.format = 'Format is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateUserBook({
        ubid,
        ...formData,
        format: formData.format || undefined, // Send undefined if empty
        progress: formData.progress || undefined,
        whereToGet: formData.whereToGet || undefined,
      }).unwrap();
      navigate(`/userBooks/${ubid}`, {
        state: {
          snackbar: {
            open: true,
            message: 'User book updated successfully!',
            severity: 'success',
          },
        },
      });
    } catch (err) {
      console.error('Failed to update user book:', err);
      // Handle API errors
      if (err.data?.message) {
        const fieldName = err.data.message.split('"')[1];
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: err.data.message,
        }));
      }
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return (
      <Typography color="error">
        Error loading user book data: {error?.message}
      </Typography>
    );

  const inputStyle = {
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
    '& .MuiSelect-select': {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.main.lightSlateBlue,
    },
    '& .MuiMenu-paper': {
      backgroundColor: theme.palette.background.default,
    },
    '& .MuiMenuItem-root': {
      color: theme.palette.main.lightSlateBlue,
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, color: theme.palette.main.lightSlateBlue }}>
        Update {formData.title || 'User Book'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          mb: 3,
        }}>
        {['favorite', 'kataloged', 'owned', 'wishlist'].map((field) => (
          <FormControlLabel
            key={field}
            control={
              <Checkbox
                checked={formData[field]}
                onChange={handleChange}
                name={field}
                color="primary"
              />
            }
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
      </Box>

      {Object.entries(formData).map(([field, value]) => {
        if (typeof value === 'boolean') {
          return null; // Checkboxes are already rendered above
        } else if (['format', 'progress', 'whereToGet'].includes(field)) {
          return (
            <FormControl
              fullWidth
              key={field}
              margin="normal"
              sx={inputStyle}
              error={!!formErrors[field]}>
              <InputLabel id={`${field}-label`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </InputLabel>
              <Select
                labelId={`${field}-label`}
                id={field}
                name={field}
                value={value}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: theme.palette.background.default,
                      '& .MuiMenuItem-root': {
                        color: theme.palette.main.lightSlateBlue,
                      },
                    },
                  },
                }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {field === 'format' &&
                  ['Hardback', 'Paperback', 'Ebook', 'Audiobook'].map(
                    (option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
                {field === 'progress' &&
                  ['Finished', 'In Progress', 'Not Started'].map(
                    (option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
                {field === 'whereToGet' &&
                  [
                    'Library',
                    'Audible',
                    'Kindle',
                    'Amazon',
                    'Local Bookstore',
                    'Other',
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
              {formErrors[field] && (
                <FormHelperText>{formErrors[field]}</FormHelperText>
              )}
            </FormControl>
          );
        } else {
          return (
            <TextField
              key={field}
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={value}
              onChange={handleChange}
              margin="normal"
              disabled={isLoading}
              sx={inputStyle}
              error={!!formErrors[field]}
              helperText={formErrors[field]}
            />
          );
        }
      })}
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
          Update User Book
        </Button>
        <Button
          onClick={() => navigate(`/userBooks/${ubid}`)}
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

export default UpdateUserBookPage;
