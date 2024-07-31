import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import auth from '../config/firebaseConfig.jsx'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL_LOCAL,
  // baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers) => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      headers.set('authorization', `Bearer ${token}`);
    } else {
      console.log('No user logged in');
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const user = auth.currentUser;

    if (user) {
      try {
        await user.getIdToken(true);
        result = await baseQuery(args, api, extraOptions);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
      }
    }
  }
  return result;
};
