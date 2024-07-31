// src/store/slices/auth.slice.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import authReducer, {
  setUser,
  clearUser,
  googleSignIn,
  signup,
  login,
  logout,
} from './auth.slice';
import { authApi } from '../api/authApiSlice';
import * as firebaseAuth from 'firebase/auth';

// Mock Firebase auth
vi.mock('firebase/auth', () => ({
  signInWithPopup: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

// Mock Firebase config
vi.mock('../../config/firebaseConfig', () => ({
  default: {
    signOut: vi.fn(),
  },
}));

describe('auth slice', () => {
  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn(() => ({
      auth: { user: null, isAuthenticated: false },
    }));
  });

  describe('reducers', () => {
    it('should handle setUser', () => {
      const user = { username: 'testuser', uid: '123' };
      const newState = authReducer(undefined, setUser(user));
      expect(newState.user).toEqual(user);
      expect(newState.isAuthenticated).toBe(true);
    });

    it('should handle clearUser', () => {
      const initialState = {
        user: { username: 'testuser', uid: '123' },
        isAuthenticated: true,
      };
      const newState = authReducer(initialState, clearUser());
      expect(newState.user).toBeNull();
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  describe('async thunks', () => {
    it('should handle googleSignIn.fulfilled', async () => {
      const mockUser = { email: 'test@example.com' };
      const mockToken = 'mock-token';
      const mockResponse = { user: { username: 'testuser', uid: '123' } };

      firebaseAuth.signInWithPopup.mockResolvedValue({
        user: {
          ...mockUser,
          getIdToken: () => Promise.resolve(mockToken),
        },
      });

      vi.spyOn(authApi.endpoints.googleSignIn, 'initiate').mockReturnValue(
        {
          unwrap: () => Promise.resolve(mockResponse),
        }
      );

      const googleSignInThunk = googleSignIn();

      const fulfilledPromise = new Promise((resolve) => {
        dispatch.mockImplementation((action) => {
          if (action.type === 'auth/googleSignIn/fulfilled') {
            resolve(action);
          }
          return action;
        });
      });

      googleSignInThunk(dispatch, getState, {});

      const fulfilledAction = await fulfilledPromise;

      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: 'auth/googleSignIn/fulfilled',
          payload: {
            username: 'testuser',
            uid: '123',
            token: mockToken,
          },
        })
      );
    });

    it('should handle signup.fulfilled', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockToken = 'mock-token';
      const mockResponse = { user: { username: 'testuser', uid: '123' } };

      firebaseAuth.createUserWithEmailAndPassword.mockResolvedValue({
        user: {
          ...mockUser,
          getIdToken: () => Promise.resolve(mockToken),
        },
      });

      vi.spyOn(authApi.endpoints.signup, 'initiate').mockReturnValue({
        unwrap: () => Promise.resolve(mockResponse),
      });

      const signupThunk = signup({ ...mockUser, username: 'testuser' });

      const fulfilledPromise = new Promise((resolve) => {
        dispatch.mockImplementation((action) => {
          if (action.type === 'auth/signup/fulfilled') {
            resolve(action);
          }
          return action;
        });
      });

      signupThunk(dispatch, getState, {});

      const fulfilledAction = await fulfilledPromise;

      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: 'auth/signup/fulfilled',
          payload: {
            username: 'testuser',
            uid: '123',
            token: mockToken,
          },
        })
      );
    });

    it('should handle login.fulfilled', async () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      const mockToken = 'mock-token';
      const mockResponse = { user: { username: 'testuser', uid: '123' } };

      firebaseAuth.signInWithEmailAndPassword.mockResolvedValue({
        user: {
          ...mockUser,
          getIdToken: () => Promise.resolve(mockToken),
        },
      });

      vi.spyOn(authApi.endpoints.login, 'initiate').mockReturnValue({
        unwrap: () => Promise.resolve(mockResponse),
      });

      const loginThunk = login(mockUser);

      const fulfilledPromise = new Promise((resolve) => {
        dispatch.mockImplementation((action) => {
          if (action.type === 'auth/login/fulfilled') {
            resolve(action);
          }
          return action;
        });
      });

      loginThunk(dispatch, getState, {});

      const fulfilledAction = await fulfilledPromise;

      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: 'auth/login/fulfilled',
          payload: {
            username: 'testuser',
            uid: '123',
            token: mockToken,
          },
        })
      );
    });

    it('should handle logout.fulfilled', async () => {
      vi.spyOn(authApi.endpoints.logout, 'initiate').mockReturnValue({
        unwrap: () => Promise.resolve(),
      });

      const logoutThunk = logout();

      const fulfilledPromise = new Promise((resolve) => {
        dispatch.mockImplementation((action) => {
          if (action.type === 'auth/logout/fulfilled') {
            resolve(action);
          }
          return action;
        });
      });

      logoutThunk(dispatch, getState, {});

      const fulfilledAction = await fulfilledPromise;

      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: 'auth/logout/fulfilled',
        })
      );
    });
  });
});
