import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserBooks,
  fetchUserBookById,
  addUserBook,
  updateUserBook,
  deleteUserBook,
} from './userBooksThunks';

const initialState = {
  books: [],
  selectedUserBook: null,
  status: 'idle',
  error: null,
};

const userBooksSlice = createSlice({
  name: 'userBooks',
  initialState,
  reducers: {
    clearSelectedUserBook: (state) => {
      state.selectedUserBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchUserBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(fetchUserBookById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserBookById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBook = action.payload;
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(fetchUserBookById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(addUserBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateUserBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        if (
          state.selectedBook &&
          state.selectedBook.id === action.payload.id
        ) {
          state.selectedBook = action.payload;
        }
      })
      .addCase(deleteUserBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => book.id !== action.payload
        );
        if (
          state.selectedBook &&
          state.selectedBook.id === action.payload
        ) {
          state.selectedBook = null;
        }
      });
  },
});

export const { clearSelectedUserBook } = userBooksSlice.actions;
export default userBooksSlice.reducer;
