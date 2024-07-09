import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebaseConfig.jsx';
import { setUser } from './store/users/usersSlice.js';
import ResponsiveLayoutWrapper from './components/LayoutWrapper/ResponsiveLayoutWrapper.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import BooksPage from './pages/BooksPage/BooksPage.jsx';

import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
import BookDetailsCard from './pages/BookDetailPage/BookDetailsCard.jsx';
import UserBooksList from './pages/UserBooksPage/UserBooksPage.jsx';
import BookSearchForm from './pages/BookDetailPage/BookSearchForm.jsx';
import useMediaQuery from './hooks/useMediaQuery';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 768px)');

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
      <ResponsiveLayoutWrapper isMobile={isMobile}>
        <Routes>
          <Route path="/" element={<HomePage isMobile={isMobile} />} />
          <Route path="/books">
            <Route index element={<BooksPage isMobile={isMobile} />} />
            <Route
              path="/books/:bid"
              element={<BookDetailsCard isMobile={isMobile} />}
            />
            <Route
              path="/books/search"
              element={<BookSearchForm isMobile={isMobile} />}
            />
          </Route>
          <Route path="/auth">
            <Route
              path="signup"
              element={<Signup isMobile={isMobile} />}
            />
            <Route path="login" element={<Login isMobile={isMobile} />} />
          </Route>
          <Route path="/userBooks">
            <Route
              path="/userBooks"
              element={<UserBooksList isMobile={isMobile} />}
            />
          </Route>
        </Routes>
      </ResponsiveLayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
