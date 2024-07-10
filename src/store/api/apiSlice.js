import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import auth from '../../../firebaseConfig.jsx';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL_LOCAL,
    prepareHeaders: async (headers, { getState }) => {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => 'books',
    }),
    getBookById: builder.query({
      query: (bid) => `books/${bid}`,
    }),
    getUserBooks: builder.query({
      query: () => 'userBooks',
    }),
    getUserBookById: builder.query({
      query: (ubid) => `userBooks/${ubid}`,
    }),
  }),
});
