// src/store/auth/auth.thunks.test.js

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import { login, signup, googleSignIn, logout } from './auth.thunks';
import * as firebaseAuth from 'firebase/auth';
import api from '../../services/api/authApi';
import auth from '../../config/firebaseConfig';

// Mocks should be at the top of the file
vi.mock('firebase/auth');
vi.mock('../../services/api/authApi');
vi.mock('../../../firebaseConfig', () => ({
  default: {
    currentUser: { getIdToken: vi.fn() },
    signOut: vi.fn(),
  },
}));

describe('Auth Thunks', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer },
    });
    vi.resetAllMocks();
  });

  describe('login', () => {
    it('should login successfully', async () => {
      vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValue(
        {}
      );
      vi.mocked(api.get).mockResolvedValue({
        data: { user: { username: 'testuser', uid: '123' } },
      });

      await store.dispatch(
        login({ email: 'test@example.com', password: 'password' })
      );

      const state = store.getState().auth;
      expect(state.user).toEqual({ username: 'testuser', uid: '123' });
      expect(state.isAuthenticated).toBe(true);
      expect(state.status).toBe('succeeded');
    });

    it('should fail login with incorrect credentials', async () => {
      vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockRejectedValue(
        new Error('Invalid credentials')
      );

      await store.dispatch(
        login({ email: 'test@example.com', password: 'wrongpassword' })
      );

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('failed');
      expect(state.error).toBe('Invalid credentials');
    });
  });

  describe('signup', () => {
    it('should signup successfully', async () => {
      vi.mocked(
        firebaseAuth.createUserWithEmailAndPassword
      ).mockResolvedValue({
        user: { updateProfile: vi.fn() },
      });
      vi.mocked(api.post).mockResolvedValue({
        data: { user: { username: 'newuser', uid: '456' } },
      });

      await store.dispatch(
        signup({
          username: 'newuser',
          email: 'new@example.com',
          password: 'password',
        })
      );

      const state = store.getState().auth;
      expect(state.user).toEqual({ username: 'newuser', uid: '456' });
      expect(state.isAuthenticated).toBe(true);
      expect(state.status).toBe('succeeded');
    });

    it('should fail signup with existing email', async () => {
      vi.mocked(
        firebaseAuth.createUserWithEmailAndPassword
      ).mockRejectedValue(new Error('Email already in use'));

      await store.dispatch(
        signup({
          username: 'newuser',
          email: 'existing@example.com',
          password: 'password',
        })
      );

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('failed');
      expect(state.error).toBe('Email already in use');
    });
  });

  describe('googleSignIn', () => {
    it('should sign in with Google successfully', async () => {
      vi.mocked(firebaseAuth.signInWithPopup).mockResolvedValue({
        user: { email: 'google@example.com' },
      });
      vi.mocked(api.post).mockResolvedValue({
        data: { user: { username: 'googleuser', uid: '789' } },
      });

      await store.dispatch(googleSignIn());

      const state = store.getState().auth;
      expect(state.user).toEqual({ username: 'googleuser', uid: '789' });
      expect(state.isAuthenticated).toBe(true);
      expect(state.status).toBe('succeeded');
    });

    it('should fail Google sign in', async () => {
      vi.mocked(firebaseAuth.signInWithPopup).mockRejectedValue(
        new Error('Google sign-in failed')
      );

      await store.dispatch(googleSignIn());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('failed');
      expect(state.error).toBe('Google sign-in failed');
    });
  });

  describe('logout', () => {
    it('should handle logout successfully', async () => {
      // Setup initial logged-in state
      store.dispatch({
        type: 'auth/setUser',
        payload: { username: 'testuser', uid: '123' },
      });

      auth.currentUser = {
        getIdToken: vi.fn().mockResolvedValue('mock-token'),
      };
      vi.mocked(api.post).mockResolvedValue({});
      auth.signOut.mockResolvedValue();

      await store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('idle');
      expect(state.error).toBeNull();
    });

    it('should handle logout failure', async () => {
      // Setup initial logged-in state
      store.dispatch({
        type: 'auth/setUser',
        payload: { username: 'testuser', uid: '123' },
      });

      // Mock the API call to reject
      vi.mocked(api.post).mockRejectedValue(
        new Error('Token retrieval failed')
      );

      const result = await store.dispatch(logout());

      expect(result.type).toBe('auth/logout/rejected');
      expect(result.payload).toBe('Token retrieval failed');

      const state = store.getState().auth;
      expect(state.user).toBeNull(); // User should be cleared even on failure
      expect(state.isAuthenticated).toBe(false);
      expect(state.status).toBe('failed');
      expect(state.error).toBe('Token retrieval failed');
    });
  });
});
