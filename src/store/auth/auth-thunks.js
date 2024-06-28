import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../firebaseConfig.jsx';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  // getIdToken,
} from 'firebase/auth';

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // const idToken = await getIdToken(user);

      const response = await fetch(
        'https://kataloged-server-test-npcxvkrrnq-uc.a.run.app/api/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: user.uid,
            username: username,
            email: user.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to store user data in Firestore');
      }

      const serializableUser = {
        uid: user.uid,
        // email: user.email,
        // username: username,
        // idToken: idToken,
      };

      return serializableUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // const idToken = await getIdToken(user);

      // Extract serializable user data
      const serializableUser = {
        uid: user.uid,
        // email: user.email,
        // idToken: idToken,
      };

      return serializableUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
