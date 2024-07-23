import axios from 'axios';
import { getAuth, getIdToken } from 'firebase/auth';
import store from '../../store/index.js'
import { logout } from '../../store/auth/auth.thunks.js'

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the current user's token
const getCurrentUserToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Request interceptor to add the token to headers
api.interceptors.request.use(
  async (config) => {
    const token = await getCurrentUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('No user logged in');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const newToken = await getIdToken(user, true); // Force refresh token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          store.dispatch(logout())
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
