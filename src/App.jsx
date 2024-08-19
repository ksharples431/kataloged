/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ResponsiveLayoutWrapper from './components/Layout/Wrapper/ResponsiveLayoutWrapper.jsx';
import ResponsiveLogin from './components/Auth/ResponsiveLogin.jsx';
import ResponsiveSignup from './components/Auth/ResponsiveSignup.jsx';

import HomePage from './pages/Home/HomePage.jsx';
import AboutPage from './pages/About/AboutPage.jsx';
import BooksPage from './pages/BooksPages/BooksPage.jsx';
import BookDetailsPage from './pages/BooksPages/BookDetailsPage.jsx';
import UpdateBookPage from './pages/BooksPages/UpdateBookPage.jsx';
import UserBooksPage from './pages/UserBooksPages/UserBooksPage.jsx';
import UserBookDetailsPage from './pages/UserBooksPages/UserBookDetailsPage.jsx';
import UpdateUserBookPage from './pages/UserBooksPages/UpdateUserBookPage.jsx';

import AuthorsPage from './pages/AuthorPages/AuthorsPage.jsx';
import AuthorBooksPage from './pages/AuthorPages/AuthorBooksPage.jsx';
import GenresPage from './pages/Genres/GenresPage.jsx';
import GenreBooksPage from './pages/Genres/GenreBooksPage.jsx';
import UserAuthorsPage from './componentsReplaced/UserAuthorsPage.jsx';
import UserAuthorBooksPage from './componentsReplaced/UserAuthorBooksPage.jsx';
import UserGenresPage from './componentsReplaced/UserGenresPage.jsx';
import UserGenreBooksPage from './componentsReplaced/UserGenreBooksPage.jsx';
import SearchResultsPage from './pages/Search/SearchResultsPage.jsx';
import GeneralSearchResultsPage from './pages/Search/GeneralSearchResultsPage.jsx';
import SearchDetailsPage from './pages/Search/SearchDetailsPage.jsx';

import auth from './config/firebaseConfig.jsx';
import { setUser, clearUser } from './store/slices/authSlice.js';

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

  return (
    <BrowserRouter>
      <ResponsiveLayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/books/:bid/edit" element={<UpdateBookPage />} />
          <Route
            path="/userBooks/:ubid/edit"
            element={<UpdateUserBookPage />}
          />
          <Route path="/auth/login" element={<ResponsiveLogin />} />
          <Route path="/auth/signup" element={<ResponsiveSignup />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route
            path="/authors/:authorName"
            element={<AuthorBooksPage />}
          />
          <Route path="/myAuthors" element={<UserAuthorsPage />} />
          <Route
            path="/myAuthors/:authorName"
            element={<UserAuthorBooksPage />}
          />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:genreName" element={<GenreBooksPage />} />
          <Route path="/myGenres" element={<UserGenresPage />} />
          <Route
            path="/myGenres/:genreName"
            element={<UserGenreBooksPage />}
          />
          <Route path="/books/:bid" element={<BookDetailsPage />} />
          <Route path="/userBooks" element={<UserBooksPage />} />
          <Route
            path="/userBooks/:ubid"
            element={<UserBookDetailsPage />}
          />
          <Route path="/search" element={<GeneralSearchResultsPage />} />
          <Route path="/books/add" element={<SearchResultsPage />} />
          <Route path="/search/:bid" element={<SearchDetailsPage />} />
        </Routes>
      </ResponsiveLayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
