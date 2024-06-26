import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import PageNav from '@/components/UI/PageNav.jsx';
import BookView from './components/BookView.jsx';
import Modal from '@/components/UI/Modal.jsx';
import EditBookForm from './components/EditBookForm.jsx';
import Button from '@/components/UI/Button.jsx';

import { openModal, closeModal } from '@/store/modal/modal-slice.js';
import { updateBook, deleteBook } from '@/store/books/books-thunks.js';

import styles from './BookViewPage.module.css';

export default function BookViewPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.books);
  const { isOpen } = useSelector((state) => state.modal);
  const { bookId } = useParams();
  const selectedBook = books.find((book) => book.id === bookId);

  const [formValues, setFormValues] = useState({
    ...selectedBook,
    owned: selectedBook.owned ? 'Yes' : 'No',
    favorite: selectedBook.favorite ? 'Yes' : 'No',
    wishlist: selectedBook.wishlist ? 'Yes' : 'No',
  });

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transformedData = {
      ...formValues,
      owned: formValues.owned === 'Yes',
      favorite: formValues.favorite === 'Yes',
      wishlist: formValues.wishlist === 'Yes',
    };

    try {
      dispatch(updateBook(transformedData));
      handleCloseModal();
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDeleteBook = (e) => {
    e.preventDefault();

    try {
      dispatch(deleteBook(selectedBook));
      handleCloseModal();
      navigate('/books');
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <PageNav />
        {selectedBook ? (
          <BookView book={selectedBook} />
        ) : (
          <p>Book not found.</p>
        )}
        {isOpen && (
          <Modal
            handleSubmit={handleSubmit}
            handleDeleteBook={handleDeleteBook}
            handleCloseModal={handleCloseModal}>
            <EditBookForm
              formValues={formValues}
              handleFormChange={handleFormChange}
            />
          </Modal>
        )}
        <Button type="button" onClick={handleOpenModal}>
          Edit Book
        </Button>
      </div>
    </>
  );
}
