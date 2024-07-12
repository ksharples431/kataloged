import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../services/api/baseQuery.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    getBookById: builder.query({
      query: (bid) => `/books/${bid}`,
    }),
    getUserBooks: builder.query({
      query: () => '/userBooks',
    }),
    getUserBookById: builder.query({
      query: (ubid) => `/userBooks/${ubid}`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
} = api;
