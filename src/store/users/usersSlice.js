import { createSlice } from '@reduxjs/toolkit';
import {
  googleSignIn,
  signup,
  login,
  logout,
} from './usersThunks';

const initialState = {
  username: null,
  isAuthenticated: false,
  isSignup: false,
  status: 'idle',
  error: null,
};

// LOOK FOR REDUNDANCES
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsSignup: (state, action) => {
      state.isSignup = action.payload;
    },
    setUser: (state, action) => {
      if (action.payload) {
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      } else {
        state.uid = null;
        state.username = null;
        state.email = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      }
    },
    clearUserData: (state) => {
      state.uid = null;
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.uid = null;
        state.username = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isSignup = false;
      });
  },
});

export const { clearUserData, setUser, setIsSignup } = userSlice.actions;
export default userSlice.reducer;
