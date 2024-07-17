import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../services/api/baseQuery.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Book', 'Books', 'UserBook', 'UserBooks'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (uid) => `/users/${uid}`,
    }),
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    getBookById: builder.query({
      query: (bid) => `/books/${bid}`,
      providesTags: (result, error, bid) => [{ type: 'Book', id: bid }],
    }),
    getUserBooks: builder.query({
      query: (uid) => ({
        url: '/userBooks',
        params: { uid },
      }),
      providesTags: ['UserBooks'],
    }),
    getUserBookById: builder.query({
      query: (ubid) => `/userBooks/${ubid}`,
      providesTags: (result, error, ubid) => [
        { type: 'UserBook', id: ubid },
      ],
    }),
    searchBooks: builder.query({
      query: (searchString) => {
        const params = new URLSearchParams(searchString);
        return {
          url: '/books/search',
          params: params,
        };
      },
    }),
    addUserBook: builder.mutation({
      query: ({ bid, uid }) => ({
        url: '/userBooks',
        method: 'POST',
        body: { bid, uid },
      }),
      // You can add a transformResponse here if you need to transform the data
      // transformResponse: (response) => response.data,
      // Invalidates the 'Books' tag, causing a refetch of any query with this tag
      invalidatesTags: ['UserBooks'],
    }),
    addBook: builder.mutation({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      // You can add a transformResponse here if you need to transform the data
      // transformResponse: (response) => response.data,
      // Invalidates the 'Books' tag, causing a refetch of any query with this tag
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useAddBookMutation,
  useAddUserBookMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
  useSearchBooksQuery,
} = api;
