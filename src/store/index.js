import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api.slice';
import authReducer from './auth/auth.slice';
import uiReducer from './ui/ui.slice';
import booksReducer from './books/booksSlice';
import userBooksReducer from './userBooks/userBooksSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    ui: uiReducer,
    books: booksReducer,
    userBooks: userBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
