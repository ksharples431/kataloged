// src/store/api/authApiSlice.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    googleSignIn: builder.mutation({
      query: (email) => ({
        url: '/auth/google-signin',
        method: 'POST',
        body: { email },
      }),
    }),
    signup: builder.mutation({
      query: ({ username, email }) => ({
        url: '/auth/signup',
        method: 'POST',
        body: { username, email },
      }),
    }),
    login: builder.query({
      query: () => '/auth/login',
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGoogleSignInMutation,
  useSignupMutation,
  useLoginQuery,
  useLogoutMutation,
} = authApi;
