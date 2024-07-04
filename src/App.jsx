import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { setUser } from './store/users/usersSlice.js';
import LayoutWrapper from './components/UI/LayoutWrapper.jsx';
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import BookList from './pages/BooksPage/BookList.jsx';
import BookDetailsCard from './pages/BookDetailPage/BookDetailsCard.jsx';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    const username = localStorage.getItem('username'); // If stored separately
    if (token && uid && username) {
      dispatch(setUser({ username }));
    }
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books">
            <Route index element={<BookList />} />
            <Route path="/books/:bid" element={<BookDetailsCard />} />
          </Route>
          <Route path="/auth">
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
