import { createSlice } from '@reduxjs/toolkit';
import { signup, login, logout } from './auth-thunks.js';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.isLoggedIn = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem('user');
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
