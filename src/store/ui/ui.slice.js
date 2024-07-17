import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSignup: false,
  },
  reducers: {
    setIsSignup: (state, action) => {
      state.isSignup = action.payload;
    },
  }
});

export const { setIsSignup } = uiSlice.actions;
export default uiSlice.reducer;
