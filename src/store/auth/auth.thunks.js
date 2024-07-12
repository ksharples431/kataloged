import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { setUser } from './auth.slice';
import auth from '../../../firebaseConfig';
import api from '../../services/api/authApi';

export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const response = await api.post('/auth/google-signin', {
        email: firebaseUser.email,
      });

      console.log('Google Sign-In API Response:', response.data);

      if (response.data.user) {
        const userData = {
          username: response.data.user.username,
          uid: response.data.user.uid,
        };
        dispatch(setUser(userData));
        return userData;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      await auth.signOut();
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
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

      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: username });

      const response = await api.post('/auth/signup', {
        username,
        email,
      });

      console.log('Signup API Response:', response.data);

      if (response.data.user) {
        const userData = {
          username: response.data.user.username,
          uid: response.data.user.uid,
        };
        dispatch(setUser(userData));
        return userData;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      await auth.signOut();
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const response = await api.get('/auth/login');

      console.log('Login API Response:', response.data);

      if (response.data.user) {
        const userData = {
          username: response.data.user.username,
          uid: response.data.user.uid,
        };
        dispatch(setUser(userData));
        return userData;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Login Error:', error);
      await auth.signOut();
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await getIdToken(currentUser);
        await api.post('/auth/logout');
      }

      await auth.signOut();
      return null;
    } catch (error) {
      console.error('Logout Error:', error);
      return rejectWithValue(
        error.message || 'An error occurred during logout'
      );
    }
  }
);
