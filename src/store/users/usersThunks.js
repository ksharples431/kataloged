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
import api from '../../componentsReplaced/api';

export const googleSignIn = createAsyncThunk(
  'user/googleSignIn',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const idToken = await getIdToken(firebaseUser);


      const response = await api.post('/auth/google-signin', {
        email: firebaseUser.email,
      }, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

      console.log('Google Sign-In API Response:', response.data);

      if (response.data.user) {
        const user = response.data.user;
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

export const signup = createAsyncThunk(
  'user/signup',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: username });
      const idToken = await getIdToken(firebaseUser);

      const response = await api.post(
        '/auth/signup',
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

      if (response.data.user) {
        return {
          username: response.data.user.username,
          uid: response.data.user.uid,
          email: response.data.user.email,
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

export const login = createAsyncThunk(
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

      const response = await api.get(`/auth/login`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log('Login API Response:', response.data);

      if (response.data.user) {
        return {
          username: response.data.user.username,
          uid: response.data.user.uid,
          email: response.data.user.email,
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

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const idToken = await getIdToken(currentUser);
        await api.post(
          '/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
      }

      await auth.signOut();
      dispatch(clearUserData());
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
