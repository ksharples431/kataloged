import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transformedResults: [],
  originalResults: [],
  isSearching: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.transformedResults = action.payload.transformed;
      state.originalResults = action.payload.original;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setSearchError: (state, action) => {
      state.error = action.payload;
    },
    clearSearchResults: (state) => {
      state.transformedResults = [];
      state.originalResults = [];
    },
  },
});

export const {
  setSearchResults,
  setIsSearching,
  setSearchError,
  clearSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
