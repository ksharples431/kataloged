import PropTypes from 'prop-types';
import {
  genre,
  format,
  progress,
  whereToGet,
  yesNo,
} from '@/functions/formOptions';
import styles from './EditBookForm.module.css';

export default function EditBookForm({ formValues, handleFormChange }) {
  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formValues.author}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={formValues.genre}
          onChange={handleFormChange}
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
        <label htmlFor="imagePath">Image Path</label>
        <input
          type="text"
          id="imagePath"
          name="imagePath"
          value={formValues.imagePath}
          onChange={handleFormChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="seriesName">Series Name</label>
        <input
          type="text"
          id="seriesName"
          name="seriesName"
          value={formValues.seriesName}
          onChange={handleFormChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="seriesNumber">Series Number</label>
        <select
          id="seriesNumber"
          name="seriesNumber"
          value={formValues.seriesNumber}
          onChange={handleFormChange}>
          <option value="">Select a number</option>
          {Array.from({ length: 41 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="format">Format</label>
        <select
          id="format"
          name="format"
          value={formValues.format}
          onChange={handleFormChange}
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
        <label htmlFor="whereToGet">Where to Get</label>
        <select
          id="whereToGet"
          name="whereToGet"
          value={formValues.whereToGet}
          onChange={handleFormChange}
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
        <label htmlFor="progress">Progress</label>
        <select
          id="progress"
          name="progress"
          value={formValues.progress}
          onChange={handleFormChange}
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
        <label htmlFor="owned">Owned</label>
        <select
          id="owned"
          name="owned"
          value={formValues.owned}
          onChange={handleFormChange}
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
        <label htmlFor="favorite">Favorite</label>
        <select
          id="favorite"
          name="favorite"
          value={formValues.favorite}
          onChange={handleFormChange}
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
        <label htmlFor="wishlist">Wishlist</label>
        <select
          id="wishlist"
          name="wishlist"
          value={formValues.wishlist}
          onChange={handleFormChange}
          required>
          <option value="">Select an option</option>
          {yesNo.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

EditBookForm.propTypes = PropTypes.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};
