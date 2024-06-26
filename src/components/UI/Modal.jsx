import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';
import styles from './Modal.module.css';

export default function Modal({
  handleSubmit,
  handleDeleteBook,
  handleCloseModal,
  children,
}) {
  const modalRef = useRef(null);
  const { isOpen } = useSelector((state) => state.modal);
  
  useEffect(() => {
    if (modalRef.current && isOpen) {
      modalRef.current.focus();
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalContainer} tabIndex="-1" ref={modalRef}>
      <div className={styles.modal}>
        <h4>Edit Book</h4>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          {children}
          <div className={styles.btnContainer}>
            <Button
              type="button"
              className={styles.btn}
              onClick={handleDeleteBook}>
              Delete Book
            </Button>
            <Button type="submit" className={styles.btn}>
              Save Book
            </Button>
            <Button
              type="button"
              className={styles.confirmBtn}
              onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteBook: PropTypes.func.isRequired,
};
