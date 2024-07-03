import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/booksSlice';
import usersReducer from './users/usersSlice';

const preloadedState = () => {
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('uid');
  const username = localStorage.getItem('username');

  if (token && uid && username) {
    return {
      users: {
        username: null, // Fetch or set an initial value
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
    books: booksReducer,
    users: usersReducer,
  },
  preloadedState: preloadedState(),
});

export default store;
