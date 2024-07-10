import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import booksReducer from './books/booksSlice';
import usersReducer from './users/usersSlice';
import userBooksReducer from './userBooks/userBooksSlice';

const preloadedState = () => {
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('uid');
  const username = localStorage.getItem('username');

  if (token && uid && username) {
    return {
      users: {
        username: null,
        isAuthenticated: true,
        status: 'succeeded',
        error: null,
      },
    };
  }
  return undefined;
};

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    books: booksReducer,
    users: usersReducer,
    userBooks: userBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  preloadedState: preloadedState(),
});

export default store;
