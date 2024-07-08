import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// FIXED DATA STRUCTURE HERE NEED TO DO REST OF THUNKS
// DID THE REST OF THE TUNKS BUT NOT SURE IF THEY WORK YET
export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async (title, { rejectWithValue }) => {
    try {
      const response = await api.get('/books/search', {
        params: { title },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

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
      if (error.response && error.response.status === 401) {
        return rejectWithValue('User not authenticated');
      }
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id, { rejectWithValue }) => {
    console.log('Fetch Book By ID:', id);
    try {
      const response = await api.get(`/books/${id}`);
      console.log('Fetch Book By ID Response:', response.data);

      if (response.data.data.book) {
        return response.data.data.book;
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

      if (response.data.data.book) {
        return response.data.data.book;
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

      if (response.data.data.book) {
        return response.data.data.book;
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
      return id; 
    } catch (error) {
      console.error('Delete Book Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
