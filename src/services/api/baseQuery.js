import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuth, getIdToken } from 'firebase/auth';
import { setUser } from '../../store/auth/auth.slice';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL_LOCAL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } else {
      console.log('No token')
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
        const newToken = await getIdToken(user, true);

        if (newToken) {
          api.dispatch(setUser({ ...user, token: newToken }));
          result = await baseQuery(args, api, extraOptions);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
      }
    }
  }
  return result;
};