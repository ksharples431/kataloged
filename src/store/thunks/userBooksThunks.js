import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../componentsReplaced/api';

// FIXED DATA STRUCTURE HERE NEED TO DO REST OF THUNKS
// DID THE REST OF THE TUNKS BUT NOT SURE IF THEY WORK YET
export const fetchUserBooks = createAsyncThunk(
  'userBooks/fetchUserBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/userBooks');
      console.log('API Response:', response.data);

      if (Array.isArray(response.data.data.userBooks)) {
        return response.data.data.userBooks;
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
export const fetchUserBookById = createAsyncThunk(
  'userBooks/fetchUserBookById',
  async (ubid, { rejectWithValue }) => {
    console.log('Fetch Book By ID:', ubid);
    try {
      const response = await api.get(`/userBooks/${ubid}`);
      console.log('Fetch Book By ID Response:', response.data);

      if (response.data.data.userBook) {
        return response.data.data.userBook;
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

export const addUserBook = createAsyncThunk(
  'books/addUserBook',
  async ({ bid, uid }, { rejectWithValue }) => {
    try {
      const response = await api.post('/userBooks', { bid, uid });
      console.log('Add Book Response:', response.data);

      if (response.data.data.userBook) {
        return response.data.data.userBook;
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

// export const updateUserBook = createAsyncThunk(
//   'books/updateUserBook',
//   async ({ id, bookData }, { rejectWithValue }) => {
//     try {
//       const response = await api.patch(`/books/${id}`, bookData);
//       console.log('Update Book Response:', response.data);

//       if (response.data.data.book) {
//         return response.data.data.book;
//       } else {
//         console.error('Unexpected API response structure:', response.data);
//         return rejectWithValue('Unexpected API response structure');
//       }
//     } catch (error) {
//       console.error('Update Book Error:', error);
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const deleteUserBook = createAsyncThunk(
//   'books/deleteUserBook',
//   async (id, { rejectWithValue }) => {
//     try {
//       await api.delete(`/books/${id}`);
//       return id;
//     } catch (error) {
//       console.error('Delete Book Error:', error);
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );
