import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div>
      <div className={styles.spinner}></div>
      <div>Searching the shelves...</div>
    </div>
  );
}
