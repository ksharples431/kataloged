import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@/components/UI/Header.jsx';
import HomePage from '@/pages/HomePage/HomePage.jsx';
import AuthPage from './pages/AuthPage/Auth.jsx';
import AddBookPage from '@/pages/AddBookPage/AddBookPage.jsx';
import BooksPage from '@/pages/BooksPage/BooksPage.jsx';
import BookViewPage from '@/pages/BookViewPage/BookViewPage.jsx';
import AuthorsPage from '@/pages/AuthorsPage/AuthorsPage.jsx';
import AuthorViewPage from '@/pages/AuthorViewPage/AuthorViewPage.jsx';
import Footer from '@/components/UI/Footer.jsx';
import GenresPage from './pages/GenresPage/GenresPage.jsx';
import GenreViewPage from './pages/GenreViewPage/GenreViewPage.jsx';


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/auth">
          <Route index element={<AuthPage />} />
          <Route path="login" element={<AuthPage authMode="login" />} />
          <Route path="signup" element={<AuthPage authMode="signup" />} />
        </Route>
        <Route path="/books">
          <Route index element={<BooksPage />} />
          <Route path=":bookId" element={<BookViewPage />} />
        </Route>
        <Route path="/authors">
          <Route index element={<AuthorsPage />} />
          <Route path=":author" element={<AuthorViewPage />} />
        </Route>
        <Route path="/genres">
          <Route index element={<GenresPage />} />
          <Route path=":genre" element={<GenreViewPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
