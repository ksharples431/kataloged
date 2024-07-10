import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { clearUserData } from './usersSlice';
import auth from '../../../firebaseConfig';
import api from '../../services/api';

export const signInWithGoogle = createAsyncThunk(
  'user/googleSignIn',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const response = await api.post('/users/google-signin', {
        email: firebaseUser.email,
        username: firebaseUser.displayName,
      });

      console.log('Google Sign-In API Response:', response.data);

      if (response.data.data.user) {
        const user = response.data.data.user;
        return {
          username: user.username,
          uid: user.uid,
          email: user.email,
        };
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

export const signupUser = createAsyncThunk(
  'user/signup',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: username });
      const idToken = await getIdToken(firebaseUser);

      const response = await api.post(
        '/users/signup',
        {
          username,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log('Signup API Response:', response.data);

      if (response.data && response.data.data && response.data.data.user) {
        const user = response.data.data.user;

        return {
          username: user.username,
        };
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

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;
      const idToken = await getIdToken(firebaseUser);

      const response = await api.get(`/users/login`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log('Login API Response:', response.data);

      if (response.data && response.data.data && response.data.data.user) {
        const user = response.data.data.user;

        return {
          username: user.username,
        };
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

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await auth.signOut();

      dispatch(clearUserData());
      console.log('Logout successful');

      return null;
    } catch (error) {
      console.error('Logout Error:', error);

      dispatch(clearUserData());
      return rejectWithValue(
        error.message || 'An error occurred during logout'
      );
    }
  }
);
