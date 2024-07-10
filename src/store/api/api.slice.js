import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL_LOCAL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    googleSignIn: builder.mutation({
      query: (userData) => ({
        url: '/users/google-signin',
        method: 'POST',
        body: userData,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/users/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
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

export const {
  useGoogleSignInMutation,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
} = api;
