import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/add-book" element={<AddBookPage />} />
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
        </Route> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
  );
}

export default App;
