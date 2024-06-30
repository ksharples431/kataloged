import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://kataloged-server-npcxvkrrnq-uc.a.run.app/api/books',
        // 'http://localhost:8080/api/books',
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
      console.log('Data:', data);

      return data.map((book) => ({
        id: book.id,
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
        'https://kataloged-server-npcxvkrrnq-uc.a.run.app/api/books',
        // 'http://localhost:8080/api/books',
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
      console.log(`Book added successfully: ${data.book.title}`);
      console.log(data)
      return data.book ;
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
        `https://kataloged-server-npcxvkrrnq-uc.a.run.app/api/books/${book.id}`,
        // `http://localhost:8080/api/books/${book.id}`,
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
      console.log(`Book edited successfully: ${data.book.title}`);
      console.log(data);
      return data.book;
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
        `https://kataloged-server-npcxvkrrnq-uc.a.run.app/api/books/${book.id}`,
        // `http://localhost:8080/api/books/${book.id}`,
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
