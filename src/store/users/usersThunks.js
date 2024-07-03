import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  signInWithPopup,
  GoogleAuthProvider,
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

      // The rest of your function remains the same
      const idToken = await getIdToken(firebaseUser);

      // Send the token and user data to your backend
      const response = await api.post(
        '/users/google-signin',
        {
          email: firebaseUser.email,
          username: firebaseUser.displayName,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log('Google Sign-In API Response:', response.data);

      if (response.data && response.data.data && response.data.data.user) {
        localStorage.setItem('token', idToken);
        localStorage.setItem('uid', response.data.data.user.id);
        localStorage.setItem('username', response.data.data.user.username);

        const user = response.data.data.user;

        return {
          username: user.username,
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
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Get the ID token
      const idToken = await getIdToken(firebaseUser);

      // Send the token, UID, and user data to your backend
      const response = await api.post(
        '/users',
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
      console.log(response.data.data.user.id)

      if (response.data && response.data.data && response.data.data.user) {
        // Signup was successful, now we can store the token
        localStorage.setItem('token', idToken);
        localStorage.setItem('uid', response.data.data.user.id);
        localStorage.setItem('username', response.data.data.user.username);

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
      // If there's an error, we should sign out the user from Firebase
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
      // Sign in the user with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Get the ID token
      const idToken = await getIdToken(firebaseUser);

      // Send the token and UID to your backend to validate and get user info
      const uid = firebaseUser.uid;
      const response = await api.get(`/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log('Login API Response:', response.data);

      if (response.data && response.data.data && response.data.data.user) {
        // Login was successful, now we can store the token
        localStorage.setItem('token', idToken);
        localStorage.setItem('uid', response.data.data.user.id);
        localStorage.setItem('username', response.data.data.user.username);

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
      // If there's an error, we should sign out the user from Firebase
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
      // Sign out from Firebase
      await auth.signOut();

      // Remove the token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      localStorage.removeItem('username');

      dispatch(clearUserData());
      console.log('Logout successful');

      return null;
    } catch (error) {
      console.error('Logout Error:', error);
      // Even if there's an error with Firebase signOut, we should still remove the token
      // to ensure the user is logged out on the client side
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      localStorage.removeItem('username');
      dispatch(clearUserData());
      return rejectWithValue(
        error.message || 'An error occurred during logout'
      );
    }
  }
);
