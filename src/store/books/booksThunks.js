import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// FIXED DATA STRUCTURE HERE NEED TO DO REST OF THUNKS
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/books');
      console.log('API Response:', response.data);

      if (Array.isArray(response.data.data.books)) {
        return response.data.data.books;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Fetch Books Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/books/${id}`);
      console.log('Fetch Book By ID Response:', response.data);

      if (response.data && !Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Fetch Book By ID Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await api.post('/books', bookData);
      console.log('Add Book Response:', response.data);

      if (response.data && !Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Add Book Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/books/${id}`, bookData);
      console.log('Update Book Response:', response.data);

      if (response.data && !Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Update Book Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/books/${id}`);
      return id; // Return the id of the deleted book
    } catch (error) {
      console.error('Delete Book Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
