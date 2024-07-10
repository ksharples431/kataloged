import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebaseConfig.jsx';
import { setUser } from './store/users/usersSlice.js';
import ResponsiveLayoutWrapper from './components/LayoutWrapper/ResponsiveLayoutWrapper.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import BooksPage from './pages/BooksPage/BooksPage.jsx';
import ResponsiveLogin from './components/Auth/ResponsiveLogin.jsx';
import ResponsiveSignup from './components/Auth/ResponsiveSignup.jsx';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        };
        console.log('User is signed in:', userData);
        dispatch(setUser(userData));
      } else {
        console.log('No user is signed in.');
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ResponsiveLayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<ResponsiveLogin />} />
          <Route path="/auth/signup" element={<ResponsiveSignup />} />
          <Route path="/books">
            <Route index element={<BooksPage />} />
          </Route>
        </Routes>
      </ResponsiveLayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
