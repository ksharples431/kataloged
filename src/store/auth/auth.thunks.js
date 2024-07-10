import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import auth from '../../../firebaseConfig';
import { api } from '../api/api.slice';

export const signInWithGoogle = createAsyncThunk(
  'auth/googleSignIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      console.log(firebaseUser);

      const response = await dispatch(
        api.endpoints.googleSignIn.initiate({
          email: firebaseUser.email,
          username: firebaseUser.displayName,
        })
      );

      if (response.data) {
        const user = response.data.data.user;
        return {
          username: user.username,
          uid: user.uid,
          email: user.email,
        };
      } else {
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
  async ({ email, password, username }, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;
      await updateProfile(firebaseUser, { displayName: username });

      const response = await dispatch(
        api.endpoints.signup.initiate({
          email: firebaseUser.email,
          username: firebaseUser.displayName,
        })
      );

      if (response.data) {
        const user = response.data.data.user;
        return {
          username: user.username,
        };
      } else {
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      const response = await dispatch(api.endpoints.login.initiate({
        email: firebaseUser.email,
        uid: firebaseUser.uid
      }));

      if (response.data && response.data.data && response.data.data.user) {
        const user = response.data.data.user;
        return {
          username: user.username,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          token: token
        };
      } else {
        return rejectWithValue('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (auth.currentUser) {
        await auth.signOut();
      }
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
