import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/booksSlice';
import usersReducer from './users/usersSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    users: usersReducer,
  },
});

export default store;
