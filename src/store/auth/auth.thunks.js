import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { setUser, clearUser } from './auth.slice';
import auth from '../../../firebaseConfig';
import api from '../../services/api/authApi';

export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      // provider.setCustomParameters({
      //   client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      // });
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await api.post('/auth/google-signin', {
        email: result.user.email,
      });

      console.log('Google Sign-In API Response:', response.data);

      if (response.data.user) {
        const userData = {
          username: response.data.user.username,
          uid: response.data.user.uid,
          token: token,
        };
        dispatch(setUser(userData));
        return userData;
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

      const response = await api.post('/auth/signup', {
        username,
        email,
      });

      console.log('Signup API Response:', response.data);

      if (response.data.user) {
        const userData = {
          username: response.data.user.username,
          uid: response.data.user.uid,
          token: token,
        };
        dispatch(setUser(userData));
        return userData;
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

      const response = await api.get('/auth/login');

      console.log('Login API Response:', response.data);

      if (response.data.user) {
        const userData = {
          username: response.data.user.username,
          uid: response.data.user.uid,
          token: token,
        };
        dispatch(setUser(userData));
        return userData;
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
      await api.post('/auth/logout');
      await auth.signOut();
      dispatch(clearUser());
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
