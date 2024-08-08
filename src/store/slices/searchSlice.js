import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: [],
  isSearching: false,
  error: null,
  lastSearchParams: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.isSearching = false;
      state.error = null;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setSearchError: (state, action) => {
      state.error = action.payload;
      state.isSearching = false;
    },
    setLastSearchParams: (state, action) => {
      state.lastSearchParams = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.isSearching = false;
      state.error = null;
      state.lastSearchParams = null;
    },
  },
});

export const {
  setSearchResults,
  setIsSearching,
  setSearchError,
  setLastSearchParams,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
