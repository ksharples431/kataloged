import { createSlice } from '@reduxjs/toolkit';
import { googleSignin, 
  // signup, 
  // login, 
  // logout 
} from './auth.thunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(googleSignin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(googleSignin.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      // .addCase(signup.pending, (state) => {
      //   state.status = 'loading';
      //   state.error = null;
      // })
      // .addCase(signup.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   state.token = action.payload.token;
      //   state.isAuthenticated = true;
      //   state.status = 'succeeded';
      //   state.error = null;
      // })
      // .addCase(signup.rejected, (state, action) => {
      //   state.user = null;
      //   state.token = null;
      //   state.isAuthenticated = false;
      //   state.status = 'failed';
      //   state.error = action.payload || 'Unknown error occurred';
      // })
      // .addCase(login.pending, (state) => {
      //   state.status = 'loading';
      //   state.error = null;
      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   state.token = action.payload.token;
      //   state.isAuthenticated = true;
      //   state.status = 'succeeded';
      //   state.error = null;
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.user = null;
      //   state.token = null;
      //   state.isAuthenticated = false;
      //   state.status = 'failed';
      //   state.error = action.payload || 'Unknown error occurred';
      // })
      // .addCase(logout.pending, (state) => {
      //   state.status = 'loading';
      //   state.error = null;
      // })
      // .addCase(logout.fulfilled, (state) => {
      //   state.user = null;
      //   state.token = null;
      //   state.isAuthenticated = false;
      //   state.status = 'idle';
      //   state.error = null;
      // })
      // .addCase(logout.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload || 'Unknown error occurred';
      // });
  },
});

export const { setUser, clearUser, updateToken } = authSlice.actions;
export default authSlice.reducer;

