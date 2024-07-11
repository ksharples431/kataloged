import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  } from '../../services/api/baseQuery.js';

export const api = createApi({
  reducerPath: 'api',
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
    // googleSignin: builder.mutation({
    //   query: (credentials) => ({
    //     url: '/auth/google-signin',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // signup: builder.mutation({
    //   query: (userData) => ({
    //     url: '/auth/signup',
    //     method: 'POST',
    //     body: userData,
    //   }),
    // }),
    // login: builder.mutation({
    //   query: (credentials) => ({
    //     url: '/auth/login',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
    // logout: builder.mutation({
    //   query: () => ({
    //     url: '/auth/logout',
    //     method: 'POST',
    //   }),
    // }),
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
  useGoogleSigninMutation,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetUserBooksQuery,
  useGetUserBookByIdQuery,
} = api;
