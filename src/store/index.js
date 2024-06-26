import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/books-slice.js';
import modalReducer from './modal/modal-slice.js';
import authReducer from './auth/auth-slice.js';

const store = configureStore({
  reducer: {
    books: booksReducer,
    modal: modalReducer,
    auth: authReducer,
  },
});

export default store;
