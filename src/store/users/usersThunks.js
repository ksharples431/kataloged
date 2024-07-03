import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from 'firebase/auth';
import { clearUserData } from './usersSlice';
import auth from '../../../firebaseConfig';
import api from '../../services/api';

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

      if (response.data && response.data.data && response.data.data.user) {
        // Signup was successful, now we can store the token
        localStorage.setItem('token', idToken);

        const user = response.data.data.user;

        // LOOK INTO WHICH I NEED TO SEND
        return {
          id: user.id, 
          uid: firebaseUser.uid,
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

        const user = response.data.data.user;
        return {
          id: user.id,
          uid: firebaseUser.uid,
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
  async (_, {dispatch, rejectWithValue }) => {
    try {
      // Sign out from Firebase
      await auth.signOut();

      // Remove the token from localStorage
      localStorage.removeItem('token');

      dispatch(clearUserData());
      console.log('Logout successful');

      return null;
    } catch (error) {
      console.error('Logout Error:', error);
      // Even if there's an error with Firebase signOut, we should still remove the token
      // to ensure the user is logged out on the client side
      localStorage.removeItem('token');
      dispatch(clearUserData());
      return rejectWithValue(
        error.message || 'An error occurred during logout'
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      console.log('Fetch User Profile API Response:', response.data);

      if (response.data.data && response.data.data.user) {
        return response.data.data.user;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Fetch User Profile Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      console.log('Update User Profile API Response:', response.data);

      if (response.data.data && response.data.data.user) {
        return response.data.data.user;
      } else {
        console.error('Unexpected API response structure:', response.data);
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Update User Profile Error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
