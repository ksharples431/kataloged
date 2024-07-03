import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutWrapper from './components/UI/LayoutWrapper.jsx';
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx'
import HomePage from './pages/HomePage/HomePage.jsx';
import BookList from './pages/BooksPage/BookList.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books">
          <Route index element={<BookList />} />
        </Route>
        <Route path="/auth">
          <Route path="signup" element={<Signup/>} />
          <Route path="login" element={<Login/>} />
        </Route>
        {/* <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/auth">
          <Route index element={<AuthPage />} />
          <Route path="login" element={<AuthPage authMode="login" />} />
          <Route path="signup" element={<AuthPage authMode="signup" />} />
        </Route>
        <Route path="/authors">
          <Route index element={<AuthorsPage />} />
          <Route path=":author" element={<AuthorViewPage />} />
        </Route>
        <Route path="/genres">
          <Route index element={<GenresPage />} />
          <Route path=":genre" element={<GenreViewPage />} />
        </Route> */}
      </Routes>
      </LayoutWrapper>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
