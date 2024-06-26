import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://backendbooks-9697c5937ad6.herokuapp.com/books',
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        // Log the full response object for better debugging
        console.error('Fetch Books Error:', response);

        // Throw an error with the response status and statusText
        throw new Error(
          `HTTP Error - ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      return data.map((book) => ({
        id: book._id,
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        imagePath: book.imagePath,
        seriesName: book.seriesName,
        seriesNumber: book.seriesNumber,
        format: book.format,
        whereToGet: book.whereToGet,
        progress: book.progress,
        favorite: book.favorite,
        wishlist: book.wishlist,
        owned: book.owned,
        updatedAt: book.updatedAt,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (book, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://backendbooks-9697c5937ad6.herokuapp.com/books',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        }
      );

      if (!response.ok) {
        throw new Error('Create book failed');
      }

      const data = await response.json();
      console.log(`${data.title} added to the database`);
      return { ...data, id: data._id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (book, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://backendbooks-9697c5937ad6.herokuapp.com/books/${book.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`${data.title} edited in the database`);
      return { ...data, id: data._id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (book, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://backendbooks-9697c5937ad6.herokuapp.com/books/${book.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(`${book.title} was deleted from the database`);
      return book.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
