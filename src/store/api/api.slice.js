import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../services/api/baseQuery.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Book',
    'Books',
    'UserBook',
    'UserBooks',
    'Authors',
    'Genres',
  ],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => ({
        url: '/books',
        params: { sortBy: params?.sortBy, order: params?.order },
      }),
      providesTags: ['Books'],
    }),
    getBookById: builder.query({
      query: (bid) => `/books/${bid}`,
      providesTags: (result, error, bid) => [{ type: 'Book', id: bid }],
    }),
    searchBooks: builder.query({
      query: (searchParams) => ({
        url: '/books/search',
        params: new URLSearchParams(searchParams),
      }),
    }),
    addBook: builder.mutation({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation({
      query: ({ bid, ...updateData }) => ({
        url: `/books/${bid}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: (result, error, { bid }) => [
        { type: 'Book', id: bid },
        'Books',
      ],
    }),
    deleteBook: builder.mutation({
      query: (bid) => ({
        url: `/books/${bid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, bid) => [
        { type: 'Book', id: bid },
        'Books',
      ],
    }),
    getAuthors: builder.query({
      query: (params) => ({
        url: '/authors',
        params: { sortBy: params?.sortBy, order: params?.order },
      }),
      providesTags: ['Authors'],
    }),
    getGenres: builder.query({
      query: (params) => ({
        url: '/genres',
        params: { sortBy: params?.sortBy, order: params?.order },
      }),
      providesTags: ['Genres'],
    }),
    getBooksByAuthor: builder.query({
      query: ({ author, sortBy, order }) => ({
        url: `/authors/${encodeURIComponent(author)}/books`,
        params: { sortBy, order },
      }),
      providesTags: (result, error, { author }) => [
        { type: 'Author', id: author },
      ],
    }),
    getBooksByGenre: builder.query({
      query: ({ genre, sortBy, order }) => ({
        url: `/genres/${encodeURIComponent(genre)}/books`,
        params: { sortBy, order },
      }),
      providesTags: (result, error, { genre }) => [
        { type: 'Genre', id: genre },
      ],
    }),
    getUserById: builder.query({
      query: (uid) => `/users/${uid}`,
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
    addUserBook: builder.mutation({
      query: ({ bid, uid }) => ({
        url: '/userBooks',
        method: 'POST',
        body: { bid, uid },
      }),
      invalidatesTags: ['UserBooks'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useSearchBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetAuthorsQuery,
  useGetGenresQuery,
  useGetBooksByAuthorQuery,
  useGetBooksByGenreQuery,
  useGetUserByIdQuery,
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
  useAddUserBookMutation,
} = api;
