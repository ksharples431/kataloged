import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    isSearching: false,
    error: null,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload;
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
  },
});

export const { setSearchResults, setIsSearching, setSearchError } =
  searchSlice.actions;
export default searchSlice.reducer;
