import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuth, getIdToken } from 'firebase/auth';
import store from '../../store/index.js';
import { logout } from '../../store/auth/auth.thunks.js';

// Function to get the current user's token
const getCurrentUserToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

export const baseQuery = fetchBaseQuery({
  // baseUrl: import.meta.env.VITE_API_URL_LOCAL, 
  baseUrl: import.meta.env.VITE_API_URL, 
  prepareHeaders: async (headers) => {
    const token = await getCurrentUserToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } else {
      console.log('No token available');
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await getIdToken(user, true); 
        result = await baseQuery(args, api, extraOptions); 
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        store.dispatch(logout());
      }
    }
  }
  return result;
};
