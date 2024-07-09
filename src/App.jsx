import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebaseConfig.jsx'
import { setUser } from './store/users/usersSlice.js';
import LayoutWrapper from './components/UI/LayoutWrapper2.jsx';
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import BookList from './pages/BooksPage/BookList.jsx';
import BookDetailsCard from './pages/BookDetailPage/BookDetailsCard.jsx';
import UserBooksList from './pages/UserBooksPage/UserBooksPage.jsx';
import BookSearchForm from './pages/BookDetailPage/BookSearchForm.jsx';
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
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books">
            <Route index element={<BookList />} />
            <Route path="/books/:bid" element={<BookDetailsCard />} />
            <Route path="/books/search" element={<BookSearchForm />} />
          </Route>
          <Route path="/auth">
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/userBooks">
            <Route path="/userBooks" element={<UserBooksList />} />
          </Route>
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
