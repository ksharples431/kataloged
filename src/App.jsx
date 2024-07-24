import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ResponsiveLayoutWrapper from './components/LayoutWrapper/ResponsiveLayoutWrapper.jsx';
import ResponsiveLogin from './components/Auth/ResponsiveLogin.jsx';
import ResponsiveSignup from './components/Auth/ResponsiveSignup.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import BooksPage from './pages/BooksPage/BooksPage.jsx';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage.jsx';
import UserBooksPage from './pages/UserBooksPage/UserBooksPage.jsx';
import UserBookDetailsPage from './pages/UserBookDetailsPage/UserBookDetailsPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage.jsx';
import SearchDetailsPage from './pages/SearchDetailsPage/SearchDetailsPage';
import LoadingSpinner from './components/UI/LoadingSpinner.jsx';

import auth from './config/firebaseConfig.jsx';
import { setUser, clearUser } from './store/slices/auth.slice.js';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [authInitialized, setAuthInitialized] = useState(false);

  const handleAuthStateChange = useCallback(
    async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const userData = {
          uid: user.uid,
          username: user.displayName,
          token: token,
        };
        console.log('User is signed in:', userData.username);
        dispatch(setUser(userData));
      } else {
        console.log('No user is signed in.');
        dispatch(clearUser());
      }
      setAuthInitialized(true);
    },
    [dispatch]
  );

  useEffect(() => {
    const unsubscribeAuthState = auth.onAuthStateChanged(
      handleAuthStateChange
    );
    const unsubscribeIdToken = auth.onIdTokenChanged(
      handleAuthStateChange
    );

    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, [handleAuthStateChange]);

  //figure out way to do this without loadingspinner
  if (!authInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <ResponsiveLayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<ResponsiveLogin />} />
          <Route path="/auth/signup" element={<ResponsiveSignup />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:bid" element={<BookDetailsPage />} />
          <Route path="/userBooks" element={<UserBooksPage />} />
          <Route
            path="/userBooks/:ubid"
            element={<UserBookDetailsPage />}
          />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/search/:bid" element={<SearchDetailsPage />} />
        </Routes>
      </ResponsiveLayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
