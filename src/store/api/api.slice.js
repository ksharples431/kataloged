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
    'UserAuthors',
    'UserGenres',
    'User',
    'Users',
  ],
  endpoints: (builder) => ({
    // Books
    addBook: builder.mutation({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
    }),
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
        params: searchParams,
      }),
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
    // User Books
    getUserBooks: builder.query({
      query: (params) => ({
        url: '/userBooks',
        params: params,
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
      query: (userBookData) => ({
        url: '/userBooks',
        method: 'POST',
        body: userBookData,
      }),
      invalidatesTags: ['UserBooks'],
    }),
    updateUserBook: builder.mutation({
      query: ({ ubid, ...updateData }) => ({
        url: `/userBooks/${ubid}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: (result, error, { ubid }) => [
        { type: 'UserBook', id: ubid },
        'UserBooks',
      ],
    }),
    deleteUserBook: builder.mutation({
      query: (ubid) => ({
        url: `/userBooks/${ubid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, ubid) => [
        { type: 'UserBook', id: ubid },
        'UserBooks',
      ],
    }),
    getUserAuthors: builder.query({
      query: ({ uid, ...params }) => ({
        url: `/userBooks/${uid}/authors`,
        params: params,
      }),
      providesTags: ['UserAuthors'],
    }),
    getUserGenres: builder.query({
      query: ({ uid, ...params }) => ({
        url: `/userBooks/${uid}/genres`,
        params: params,
      }),
      providesTags: ['UserGenres'],
    }),
    getUserBooksByAuthor: builder.query({
      query: ({ uid, author, ...params }) => ({
        url: `/userBooks/${uid}/authors/${encodeURIComponent(
          author
        )}/books`,
        params: params,
      }),
      providesTags: (result, error, { uid, author }) => [
        { type: 'UserAuthor', id: `${uid}-${author}` },
      ],
    }),
    getUserBooksByGenre: builder.query({
      query: ({ uid, genre, ...params }) => ({
        url: `/userBooks/${uid}/genres/${encodeURIComponent(genre)}/books`,
        params: params,
      }),
      providesTags: (result, error, { uid, genre }) => [
        { type: 'UserGenre', id: `${uid}-${genre}` },
      ],
    }),
    // Users
    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users', { type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query({
      query: (uid) => `/users/${uid}`,
      providesTags: (result, error, uid) => [{ type: 'User', id: uid }],
    }),
    updateUser: builder.mutation({
      query: ({ uid, ...updateData }) => ({
        url: `/users/${uid}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: (result, error, { uid }) => [
        { type: 'User', id: uid },
        { type: 'User', id: 'LIST' },
        'Users',
      ],
    }),
    deleteUser: builder.mutation({
      query: (uid) => ({
        url: `/users/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, uid) => [
        { type: 'User', id: uid },
        { type: 'User', id: 'LIST' },
        'Users',
      ],
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
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
  useAddUserBookMutation,
  useUpdateUserBookMutation,
  useDeleteUserBookMutation,
  useGetUserAuthorsQuery,
  useGetUserGenresQuery,
  useGetUserBooksByAuthorQuery,
  useGetUserBooksByGenreQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
