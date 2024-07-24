import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

(async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log('Persistence set to local');
  } catch (error) {
    console.error('Failed to set persistence:', error);
  }
})();

export default auth;

