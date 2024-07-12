import { createSlice } from '@reduxjs/toolkit';
import { googleSignIn, signup, login, logout } from './auth.thunks';
import auth from '../../../firebaseConfig'

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// LOOK FOR REDUNDANCES
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

export const { clearUser, setUser } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;

export const getCurrentUserToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return user.getIdToken();
  }
  return null;
};

export default authSlice.reducer;
