import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';
import { handleApiError } from '../../utils/apiErrorHandling';
import { setError } from '../slices/errorSlice';

// Todo: see if error and loading should be handled in the errorSlice and uiSlice only

const logResponse = (endpoint) => (response) => {
  console.log(`Response from ${endpoint}:`, response);
  return response;
};

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

    getBooks: builder.query({
      query: (params) => ({
        url: '/books',
        params: { sortBy: params?.sortBy, order: params?.order },
      }),
      providesTags: ['Books'],
      transformResponse: logResponse('getBooks'),
    }),

    getBookById: builder.query({
      query: (bid) => `/books/${bid}`,
      providesTags: (result, error, bid) => [{ type: 'Book', id: bid }],
      options: {
        ignoreIfFailResponse: ({ status }) => status === 404,
      },
      transformResponse: logResponse('getBookById'),
    }),

    addBook: builder.mutation({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
      transformResponse: logResponse('addBook'),
    }),

    updateBook: builder.mutation({
      query: ({ bid, ...updateData }) => {
        return {
          url: `/books/${bid}`,
          method: 'PUT',
          body: updateData,
        };
      },
      invalidatesTags: (result, error, { bid }) => [
        { type: 'Book', id: bid },
        'Books',
      ],
      transformResponse: logResponse('updateBook'),
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
      transformResponse: logResponse('deleteBook'),
    }),

    searchBooks: builder.query({
      query: (searchParams) => ({
        url: '/books/search',
        params: searchParams
          ? Object.fromEntries(new URLSearchParams(searchParams))
          : undefined,
      }),
      transformResponse: logResponse('searchBooks'),
    }),

    searchGoogleBooks: builder.query({
      query: (searchParams) => ({
        url: '/books/google-search',
        params: searchParams
          ? Object.fromEntries(new URLSearchParams(searchParams))
          : undefined,
      }),
      transformResponse: logResponse('searchGoogleBooks'),
    }),

    generalSearchBooks: builder.query({
      query: (searchParams) => ({
        url: '/books/general-search',
        params: { query: searchParams.query, uid: searchParams.uid },
      }),
      transformResponse: (response) => {
        console.log('Raw response:', response); // Log the raw response

        return {
          allBooks: response?.data?.allBooks || [],
          userBooks: response?.data?.userBooks || [],
        };
      },
    }),

    checkBookExists: builder.mutation({
      query: (bid) => ({
        url: `books/check/${bid}`,
        method: 'GET',
      }),
      transformResponse: logResponse('checkBookExists'),
    }),

    getAuthors: builder.query({
      query: (params) => ({
        url: '/authors',
        params: { sortBy: params?.sortBy, order: params?.order },
      }),
      providesTags: ['Authors'],
      transformResponse: logResponse('getAuthors'),
    }),

    getBooksByAuthor: builder.query({
      query: ({ author, sortBy, order }) => ({
        url: `/authors/${encodeURIComponent(author)}/books`,
        params: { sortBy, order },
      }),
      providesTags: (result, error, { author }) => [
        { type: 'Author', id: author },
      ],
      transformResponse: logResponse('getBooksByAuthor'),
    }),

    getGenres: builder.query({
      query: (params) => ({
        url: '/genres',
        params: { sortBy: params?.sortBy, order: params?.order },
      }),
      providesTags: ['Genres'],
      transformResponse: logResponse('getGenres'),
    }),

    getBooksByGenre: builder.query({
      query: ({ genre, sortBy, order }) => ({
        url: `/genres/${encodeURIComponent(genre)}/books`,
        params: { sortBy, order },
      }),
      providesTags: (result, error, { genre }) => [
        { type: 'Genre', id: genre },
      ],
      transformResponse: logResponse('getBooksByGenre'),
    }),

    // UserBooks
    getUserBooks: builder.query({
      query: (params) => ({
        url: '/userBooks',
        params: {
          uid: params.uid,
          sortBy: params?.sortBy,
          order: params?.order,
        },
      }),
      providesTags: ['UserBooks'],
      transformResponse: logResponse('getUserBooks'),
    }),

    getUserBookById: builder.query({
      query: (ubid) => `/userBooks/${ubid}`,
      providesTags: (result, error, ubid) => [
        { type: 'UserBook', id: ubid },
      ],
      options: {
        ignoreIfFailResponse: ({ status }) => status === 404,
      },
      transformResponse: logResponse('getUserBookById'),
    }),

    addUserBook: builder.mutation({
      query: (userBookData) => ({
        url: '/userBooks',
        method: 'POST',
        body: userBookData,
      }),
      invalidatesTags: ['UserBooks'],
      transformResponse: logResponse('addUserBook'),
    }),

    updateUserBook: builder.mutation({
      query: ({ ubid, ...updateData }) => {
        return {
          url: `/userBooks/${ubid}`,
          method: 'PUT',
          body: updateData,
        };
      },
      invalidatesTags: (result, error, { ubid }) => [
        { type: 'UserBook', id: ubid },
        'UserBooks',
      ],
      transformResponse: logResponse('updateUserBook'),
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
      transformResponse: logResponse('deleteUserBook'),
    }),

    getUserAuthors: builder.query({
      query: ({ uid, ...params }) => ({
        url: `/userBooks/${uid}/authors`,
        params: params,
      }),
      providesTags: ['UserAuthors'],
      transformResponse: logResponse('getUserAuthors'),
    }),

    getUserGenres: builder.query({
      query: ({ uid, ...params }) => ({
        url: `/userBooks/${uid}/genres`,
        params: params,
      }),
      providesTags: ['UserGenres'],
      transformResponse: logResponse('getUserGenres'),
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
      transformResponse: logResponse('getUserBooksByAuthor'),
    }),

    getUserBooksByGenre: builder.query({
      query: ({ uid, genre, ...params }) => ({
        url: `/userBooks/${uid}/genres/${encodeURIComponent(genre)}/books`,
        params: params,
      }),
      providesTags: (result, error, { uid, genre }) => [
        { type: 'UserGenre', id: `${uid}-${genre}` },
      ],
      transformResponse: logResponse('getUserBooksByGenre'),
    }),

    logFrontendError: builder.mutation({
      query: (errorData) => ({
        url: '/log-frontend-error',
        method: 'POST',
        body: errorData,
      }),
      // Optionally, you can add a custom error handler
      // This will run if the API call itself fails
      onError: (error) => {
        console.error('Failed to log frontend error:', error);
      },
      // Optionally, you can transform the response
      transformResponse: (response) => {
        console.log('Frontend error logged:', response);
        return response;
      },
    }),

    // Users
    // getAllUsers: builder.query({
    //   query: () => '/users',
    //   providesTags: ['Users', { type: 'User', id: 'LIST' }],
    // }),
    // getUserById: builder.query({
    //   query: (uid) => `/users/${uid}`,
    //   providesTags: (result, error, uid) => [{ type: 'User', id: uid }],
    // }),
    // updateUser: builder.mutation({
    //   query: ({ uid, ...updateData }) => ({
    //     url: `/users/${uid}`,
    //     method: 'PUT',
    //     body: updateData,
    //   }),
    //   invalidatesTags: (result, error, { uid }) => [
    //     { type: 'User', id: uid },
    //     { type: 'User', id: 'LIST' },
    //     'Users',
    //   ],
    // }),
    // deleteUser: builder.mutation({
    //   query: (uid) => ({
    //     url: `/users/${uid}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: (result, error, uid) => [
    //     { type: 'User', id: uid },
    //     { type: 'User', id: 'LIST' },
    //     'Users',
    //   ],
    // }),
  }),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    ...Object.keys(api.endpoints).reduce((acc, endpointName) => {
      acc[endpointName] = {
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (error) {
            const handledError = handleApiError(error.error);
            dispatch(setError(handledError));
          }
        },
      };
      return acc;
    }, {}),
  },
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useSearchBooksQuery,
  useGeneralSearchBooksQuery,
  useSearchGoogleBooksQuery,
  useCheckBookExistsMutation,
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
  useLogFrontendErrorMutation,
} = enhancedApi;
