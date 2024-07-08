import { createSlice } from '@reduxjs/toolkit';
import {
  searchBooks,
  fetchBooks,
  fetchBookById,
  addBook,
  updateBook,
  deleteBook,
} from './booksThunks';

const initialState = {
  books: [],
  selectedBook: null,
  searchResults: [],
  status: 'idle',
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload.data.books;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(fetchBookById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBook = action.payload;
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
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
      .addCase(deleteBook.fulfilled, (state, action) => {
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

export const { clearSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
