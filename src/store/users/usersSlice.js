import { createSlice } from '@reduxjs/toolkit';
import {
  signupUser,
  loginUser,
  logoutUser,
  fetchUserProfile,
  updateUserProfile,
} from './usersThunks';

const initialState = {
  uid: null,
  username: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.uid = null;
      state.username = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.uid = action.payload.id;
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
        state.uid = action.payload.id;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.uid = null;
        state.username = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state) => {
        state.status = 'succeeded';
        // We don't store the full profile in the Redux store anymore
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // We only update the username if it's changed
        if (
          action.payload.username &&
          action.payload.username !== state.username
        ) {
          state.username = action.payload.username;
        }
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
