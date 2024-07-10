import axios from 'axios';
import auth from '../../firebaseConfig.jsx'

const API_URL = import.meta.env.VITE_API_URL
// const API_URL = import.meta.env.VITE_API_URL_LOCAL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const unprotectedRoutes = [
  '/books/',
  '/books/:bid',
  // '/users/signup',
  // '/users/login',
  // '/users/google-signin', 
  // '/users',
];

api.interceptors.request.use(
  async (config) => {
    const isUnprotectedRoute = unprotectedRoutes.some((route) =>
      config.url.includes(route)
    );

    if (!isUnprotectedRoute && auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!isUnprotectedRoute) {
      console.log('No user logged in, but route is protected');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;