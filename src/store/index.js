// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api.slice';
import { authApi } from './api/authApi.slice';
import authReducer, { logout } from './slices/auth.slice';
import uiReducer from './slices/ui.slice';
import searchReducer from './slices/search.slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    ui: uiReducer,
    search: searchReducer,
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
