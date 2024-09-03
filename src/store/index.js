// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import { authApi } from './api/authApiSlice';
import authReducer, { logout } from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import searchReducer from './slices/searchSlice';
import errorReducer from './slices/errorSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    ui: uiReducer,
    search: searchReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(authApi.middleware)
      .concat((store) => (next) => (action) => {
        if (
          action.type === 'authApi/executeMutation/rejected' &&
          action.payload?.status === 401
        ) {
          store.dispatch(logout());
          window.location.href = '/auth/login';
        }
        return next(action);
      }),
});

export default store;
