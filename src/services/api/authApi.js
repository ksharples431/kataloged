import axios from 'axios';
import auth from '../../../firebaseConfig.jsx';

// const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
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

export default api;
