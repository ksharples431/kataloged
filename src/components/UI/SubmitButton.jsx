import PropTypes from 'prop-types';
import styles from './Button.module.css';

const SubmitButton = ({ onClick, children }) => {
  

   const handleSubmit = (e) => {
     e.preventDefault();
     const transformedData = {
       ...formData,
       owned: formData.owned === 'Yes',
       favorite: formData.favorite === 'Yes',
       wishlist: formData.wishlist === 'Yes',
     };

     dispatch(updateBook(transformedData));
     onBookUpdate(transformedData);
     onCloseModal();
   };

  return (
    <button type="submit" className={styles.button} onClick={handleSubmit}>
      {children}
    </button>
  );
};

SubmitButton.propTypes = PropTypes.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default SubmitButton;
