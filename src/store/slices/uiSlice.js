import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSignup: false,
    isLoading: false,
    loadingMessage: '',
  },
  reducers: {
    setIsSignup: (state, action) => {
      state.isSignup = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
  },
});

export const { setIsSignup, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
