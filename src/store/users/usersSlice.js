import { createSlice } from '@reduxjs/toolkit';
import {
  signInWithGoogle,
  signupUser,
  loginUser,
  logoutUser,
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
      .addCase(signInWithGoogle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uid = action.payload.uid;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.uid = null;
        state.username = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearUserData, setUser, setIsSignup } = userSlice.actions;
export default userSlice.reducer;
