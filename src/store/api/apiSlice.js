import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery';

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
    }),

    getBookById: builder.query({
      query: (bid) => `/books/${bid}`,
      providesTags: (result, error, bid) => [{ type: 'Book', id: bid }],
      options: {
        ignoreIfFailResponse: ({ status }) => status === 404,
      },
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

    searchBooks: builder.query({
      query: (searchParams) => ({
        url: '/books/search',
        params: searchParams
          ? Object.fromEntries(new URLSearchParams(searchParams))
          : undefined,
      }),
    }),

    searchGoogleBooks: builder.query({
      query: (searchParams) => ({
        url: '/books/google-search',
        params: searchParams
          ? Object.fromEntries(new URLSearchParams(searchParams))
          : undefined,
      }),
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
    }),

    getAuthors: builder.query({
      query: (params) => ({
        url: '/authors',
        params: { sortBy: params?.sortBy, order: params?.order },
      }),
      providesTags: ['Authors'],
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

    // getGenres: builder.query({
    //   query: (params) => ({
    //     url: '/genres',
    //     params: { sortBy: params?.sortBy, order: params?.order },
    //   }),
    //   transformResponse: (response) => {
    //     const transformedData = {
    //       items: response.genres.map((genre) => ({
    //         id: genre.genre,
    //         name: genre.genre,
    //         secondaryText: `${genre.bookCount} ${
    //           genre.bookCount === 1 ? 'book' : 'books'
    //         }`,
    //       })),
    //       type: 'genre',
    //     };
    //     console.log('Transformed Genres:', transformedData);
    //     return transformedData;
    //   },
    //   providesTags: ['Genres'],
    // }),

    // getBooksByGenre: builder.query({
    //   query: ({ genre, sortBy, order }) => ({
    //     url: `/genres/${encodeURIComponent(genre)}/books`,
    //     params: { sortBy, order },
    //   }),
    //   transformResponse: (response) => {
    //     const transformedData = {
    //       items: response.books.map((book) => ({
    //         id: book.bid,
    //         name: book.title,
    //         imagePath: book.imagePath,
    //         secondaryText: book.author,
    //       })),
    //       type: 'book',
    //     };
    //     console.log('Transformed Books by Genre:', transformedData);
    //     return transformedData;
    //   },
    //   providesTags: (result, error, { genre }) => [
    //     { type: 'Genre', id: genre },
    //   ],
    // }),

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
    }),

    getUserBookById: builder.query({
      query: (ubid) => `/userBooks/${ubid}`,
      providesTags: (result, error, ubid) => [
        { type: 'UserBook', id: ubid },
      ],
      options: {
        ignoreIfFailResponse: ({ status }) => status === 404,
      },
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

    // getUserAuthors: builder.query({
    //   query: ({ uid, ...params }) => ({
    //     url: `/userBooks/${uid}/authors`,
    //     params: params,
    //   }),
    //   transformResponse: (response) => {
    //     const transformedData = {
    //       items: response.authors.map((author) => ({
    //         id: author.author,
    //         name: author.author,
    //         secondaryText: `${author.bookCount} ${
    //           author.bookCount === 1 ? 'book' : 'books'
    //         }`,
    //       })),
    //       type: 'author',
    //     };
    //     console.log('Transformed User Authors:', transformedData);
    //     return transformedData;
    //   },
    //   providesTags: ['UserAuthors'],
    // }),

    // getUserGenres: builder.query({
    //   query: ({ uid, ...params }) => ({
    //     url: `/userBooks/${uid}/genres`,
    //     params: params,
    //   }),
    //   transformResponse: (response) => {
    //     const transformedData = {
    //       items: response.genres.map((genre) => ({
    //         id: genre.genre,
    //         name: genre.genre,
    //         secondaryText: `${genre.bookCount} ${
    //           genre.bookCount === 1 ? 'book' : 'books'
    //         }`,
    //       })),
    //       type: 'genre',
    //     };
    //     console.log('Transformed User Genres:', transformedData);
    //     return transformedData;
    //   },
    //   providesTags: ['UserGenres'],
    // }),

    // getUserBooksByAuthor: builder.query({
    //   query: ({ uid, author, ...params }) => ({
    //     url: `/userBooks/${uid}/authors/${encodeURIComponent(
    //       author
    //     )}/books`,
    //     params: params,
    //   }),
    //   transformResponse: (response) => {
    //     const transformedData = {
    //       items: response.books.map((book) => ({
    //         id: book.ubid,
    //         name: book.title,
    //         imagePath: book.imagePath,
    //         secondaryText: book.author,
    //       })),
    //       type: 'book',
    //     };
    //     console.log('Transformed User Books by Author:', transformedData);
    //     return transformedData;
    //   },
    //   providesTags: (result, error, { uid, author }) => [
    //     { type: 'UserAuthor', id: `${uid}-${author}` },
    //   ],
    // }),

    // getUserBooksByGenre: builder.query({
    //   query: ({ uid, genre, ...params }) => ({
    //     url: `/userBooks/${uid}/genres/${encodeURIComponent(genre)}/books`,
    //     params: params,
    //   }),
    //   transformResponse: (response) => {
    //     const transformedData = {
    //       items: response.books.map((book) => ({
    //         id: book.ubid,
    //         name: book.title,
    //         imagePath: book.imagePath,
    //         secondaryText: book.author,
    //       })),
    //       type: 'book',
    //     };
    //     console.log('Transformed User Books by Genre:', transformedData);
    //     return transformedData;
    //   },
    //   providesTags: (result, error, { uid, genre }) => [
    //     { type: 'UserGenre', id: `${uid}-${genre}` },
    //   ],
    // }),

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
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
