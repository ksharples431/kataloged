import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dbSearchResults: [],
  googleSearchResults: [],
  generalSearchResults: [],
  userSearchResults: [],
  isSearching: false,
  error: null,
  lastSearchParams: null,
  searchType: null,
  searchCriteria: {
    title: '',
    author: '',
    isbn: '',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setDbSearchResults: (state, action) => {
      state.dbSearchResults = action.payload;
      state.isSearching = false;
      state.error = null;
    },
    setGoogleSearchResults: (state, action) => {
      state.googleSearchResults = action.payload;
      state.isSearching = false;
      state.error = null;
    },
    setGeneralSearchResults: (state, action) => {
      state.generalSearchResults = action.payload || [];
      state.isSearching = false;
      state.error = null;
    },
    setUserSearchResults: (state, action) => {
      state.userSearchResults = action.payload || [];
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
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    clearSearch: (state) => {
      state.dbSearchResults = [];
      state.googleSearchResults = [];
      state.generalSearchResults = [];
      state.userSearchResults = [];
      state.isSearching = false;
      state.error = null;
      state.lastSearchParams = null;
      state.searchType = null;
      state.searchCriteria = {
        title: '',
        author: '',
        isbn: '',
      };
    },
  },
});

export const {
  setDbSearchResults,
  setGoogleSearchResults,
  setGeneralSearchResults,
  setUserSearchResults,
  setIsSearching,
  setSearchError,
  setLastSearchParams,
  setSearchType,
  setSearchCriteria,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
