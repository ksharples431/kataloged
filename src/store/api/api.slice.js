import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../services/api/baseQuery.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Book', 'UserBook'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (uid) => `/users/${uid}`,
    }),
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Book'],
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
      providesTags: ['UserBook'],
    }),
    getUserBookById: builder.query({
      query: (ubid) => `/userBooks/${ubid}`,
      providesTags: (result, error, ubid) => [
        { type: 'UserBook', id: ubid },
      ],
    }),
    searchBooks: builder.query({
      query: (searchString) => ({
        url: '/books/search',
        params: new URLSearchParams(searchString),
      }),
      // This will keep the data in the cache for 5 minutes
      keepUnusedDataFor: 300,
    }),
    addUserBook: builder.mutation({
      query: ({ bid, uid }) => ({
        url: '/userBooks',
        method: 'POST',
        body: { bid, uid },
      }),
      // transformResponse: (response) => {
      //   console.log(response.data)
      //   if (response.data && response.data.userBook) {
      //     return response.data.userBook;
      //   } else {
      //     throw new Error('Unexpected API response structure');
      //   }
      // },
    }),
  }),
});

export const {
  useAddUserBookMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
  useSearchBooksQuery,
} = api;
