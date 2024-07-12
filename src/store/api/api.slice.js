import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../services/api/baseQuery.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Book', 'UserBook'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query({
      query: (bid) => `/books/${bid}`,
      providesTags: (result, error, bid) => [{ type: 'Book', id: bid }],
    }),
    getUserBooks: builder.query({
      query: () => '/userBooks',
      providesTags: ['UserBook'],
    }),
    getUserBookById: builder.query({
      query: (ubid) => `/userBooks/${ubid}`,
      providesTags: (result, error, ubid) => [
        { type: 'UserBook', id: ubid },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
} = api;
