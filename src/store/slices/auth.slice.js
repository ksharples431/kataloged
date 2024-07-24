// src/store/auth/auth.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { authApi } from '../api/authApi.slice';
import auth from '../../config/firebaseConfig';


const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Thunks
export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await dispatch(
        authApi.endpoints.googleSignIn.initiate(result.user.email)
      ).unwrap();

      if (response.user) {
        return {
          username: response.user.username,
          uid: response.user.uid,
          token: token,
        };
      } else {
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      await auth.signOut();
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      const token = await userCredential.user.getIdToken();

      const response = await dispatch(
        authApi.endpoints.signup.initiate({ username, email })
      ).unwrap();

      if (response.user) {
        return {
          username: response.user.username,
          uid: response.user.uid,
          token: token,
        };
      } else {
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      await auth.signOut();
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      const response = await dispatch(
        authApi.endpoints.login.initiate()
      ).unwrap();

      if (response.user) {
        return {
          username: response.user.username,
          uid: response.user.uid,
          token: token,
        };
      } else {
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      await auth.signOut();
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(authApi.endpoints.logout.initiate()).unwrap();
      await auth.signOut();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.status = action.payload ? 'succeeded' : 'idle';
      state.error = null;
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
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
