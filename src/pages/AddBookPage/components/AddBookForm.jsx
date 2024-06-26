import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/UI/Button';
import { addBook } from '@/store/books/books-thunks.js';
import {
  genre,
  format,
  progress,
  whereToGet,
  yesNo,
} from '@/functions/formOptions';
import styles from './AddBookForm.module.css';

export default function BookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    imagePath: '',
    genre: '',
    description: '',
    seriesName: '',
    seriesNumber: '',
    format: '',
    owned: '',
    progress: '',
    favorite: '',
    whereToGet: '',
    wishlist: '',
  });

  /// check if this is needed anymore
  const imageInputRef = useRef(null);

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      genre: '',
      description: '',
      format: '',
      seriesName: '',
      seriesNumber: '',
      owned: '',
      progress: '',
      favorite: '',
      whereToGet: '',
      wishlist: '',
    });
    imageInputRef.current.value = null;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transformedData = {
      ...formData,
      owned: formData.owned === 'Yes',
      favorite: formData.favorite === 'Yes',
      wishlist: formData.wishlist === 'Yes',
    };

    await dispatch(addBook(transformedData));
    resetForm();
    navigate('/books');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="imagePath">Image Path</label>
        <input
          type="text"
          id="imagePath"
          name="imagePath"
          onChange={handleChange}
          ref={imageInputRef}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required>
          <option value="">Select a genre</option>
          {genre.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="seriesName">Series Name</label>
        <input
          type="text"
          id="seriesName"
          name="seriesName"
          value={formData.seriesName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="seriesNumber">Series Number</label>
        <select
          id="seriesNumber"
          name="seriesNumber"
          value={formData.seriesNumber}
          onChange={handleChange}>
          <option value="">Select a number</option>
          {Array.from({ length: 41 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="format">Format</label>
        <select
          id="format"
          name="format"
          value={formData.format}
          onChange={handleChange}
          required>
          <option value="">Select a format</option>
          {format.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="owned">Owned</label>
        <select
          id="owned"
          name="owned"
          value={formData.owned}
          onChange={handleChange}
          required>
          <option value="">Select an option</option>
          {yesNo.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="progress">Progress</label>
        <select
          id="progress"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
          required>
          <option value="">Select an option</option>
          {progress.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="favorite">Favorite</label>
        <select
          id="favorite"
          name="favorite"
          value={formData.favorite}
          onChange={handleChange}
          required>
          <option value="">Select an option</option>
          {yesNo.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="whereToGet">Where to Get</label>
        <select
          id="whereToGet"
          name="whereToGet"
          value={formData.whereToGet}
          onChange={handleChange}
          required>
          <option value="">Select an option</option>
          {whereToGet.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="wishlist">Wishlist</label>
        <select
          id="wishlist"
          name="wishlist"
          value={formData.wishlist}
          onChange={handleChange}
          required>
          <option value="">Select an option</option>
          {yesNo.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit">Save Book</Button>
    </form>
  );
}
