import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  signInWithPopup,
  // createUserWithEmailAndPassword,
  // updateProfile,
  // signInWithEmailAndPassword,
} from 'firebase/auth';
import auth from '../../../firebaseConfig.jsx';
// import { clearUser } from '../auth/auth.slice';

// const API_URL = import.meta.env.VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const googleSignin = createAsyncThunk(
  'auth/googleSignin',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const response = await api.post('/auth/google-signin', {
        email: firebaseUser.email,
        username: firebaseUser.displayName,
      });

      console.log('Google Sign-In API Response:', response.data);

      if (response.data) {
        console.log(response.data)
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

// export const signInWithGoogle = createAsyncThunk(
//   'auth/googleSignIn',
//   async (_, { dispatch, rejectWithValue }) => {
//     try {
//       const provider = new GoogleAuthProvider();
//       provider.setCustomParameters({
//         client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
//       });

//       const result = await signInWithPopup(auth, provider);
//       console.log(result)
//       const userData = await handleAuthResponse(result.user);
//       console.log(userData)

//       const response = await dispatch(
//         api.endpoints.googleSignIn.initiate(userData, {
//           headers: { Authorization: `Bearer ${userData.token}` },
//         })
//       );

//       if (response.data && response.data.data && response.data.data.user) {
//         return {
//           ...userData,
//           username: response.data.data.user.username,
//         };
//       } else {
//         return rejectWithValue('Unexpected API response structure');
//       }
//     } catch (error) {
//       console.error('Google Sign-In Error:', error);
//       await auth.signOut();
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const signup = createAsyncThunk(
//   'auth/signup',
//   async ({ email, password, username }, { dispatch, rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       await updateProfile(userCredential.user, { displayName: username });

//       const userData = await handleAuthResponse(userCredential.user);

//       const response = await dispatch(
//         api.endpoints.signup.initiate(userData, {
//           headers: { Authorization: `Bearer ${userData.token}` },
//         })
//       );

//       if (response.data && response.data.data && response.data.data.user) {
//         return userData;
//       } else {
//         return rejectWithValue('Unexpected API response structure');
//       }
//     } catch (error) {
//       console.error('Signup Error:', error);
//       await auth.signOut();
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { dispatch, rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const userData = await handleAuthResponse(userCredential.user);

//       const response = await dispatch(
//         api.endpoints.login.initiate(userData, {
//           headers: { Authorization: `Bearer ${userData.token}` },
//         })
//       );

//       if (response.data && response.data.data && response.data.data.user) {
//         return userData;
//       } else {
//         return rejectWithValue('Unexpected API response structure');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       if (auth.currentUser) {
//         await auth.signOut();
//       }
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (_, { dispatch, getState, rejectWithValue }) => {
//     try {
//       const { token } = getState().auth;

//       const result = await dispatch(
//         api.endpoints.logout.initiate(null, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//       );

//       if (result.error)
//         throw new Error(result.error.data?.message || 'Logout failed');

//       // IS THIS NECESSARY???
//       localStorage.removeItem('token');

//       await auth.signOut();
//       dispatch(clearUser());

//       return null;
//     } catch (error) {
//       console.error('Logout Error:', error);
//       return rejectWithValue(
//         error.message || 'An error occurred during logout'
//       );
//     }
//   }
// );