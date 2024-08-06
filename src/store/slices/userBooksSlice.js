import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserBooks,
  fetchUserBookById,
  addUserBook,
  updateUserBook,
  deleteUserBook,
} from './userBooksSlice';

const initialState = {
  userBooks: [],
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
        state.userBooks = action.payload;
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
        state.selectedUserBook = action.payload;
        const index = state.userBooks.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.userBooks[index] = action.payload;
        }
      })
      .addCase(fetchUserBookById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(addUserBook.fulfilled, (state, action) => {
        state.userBooks.push(action.payload);
      })
      .addCase(updateUserBook.fulfilled, (state, action) => {
        const index = state.userBooks.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.userBooks[index] = action.payload;
        }
        if (
          state.selectedUserBook &&
          state.selectedUserBook.id === action.payload.id
        ) {
          state.selectedUserBook = action.payload;
        }
      })
      .addCase(deleteUserBook.fulfilled, (state, action) => {
        state.userBooks = state.userBooks.filter(
          (book) => book.id !== action.payload
        );
        if (
          state.selectedUserBook &&
          state.selectedUserBook.id === action.payload
        ) {
          state.selectedUserBook = null;
        }
      });
  },
});

export const { clearSelectedUserBook } = userBooksSlice.actions;
export default userBooksSlice.reducer;
