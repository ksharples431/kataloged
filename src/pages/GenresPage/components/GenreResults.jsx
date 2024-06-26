import PropTypes from 'prop-types';
import CategoryCard from '@/components/UI/CategoryCard.jsx';
import styles from './GenreList.module.css';

export default function GenreResults({ genres }) {
  return (
    <div className={styles.genreList}>
      {genres.map((genre) => (
        <div key={genre.id} className={styles.genreItem}>
          <CategoryCard item={genre} name="genres" />
        </div>
      ))}
    </div>
  );
}

GenreResults.propTypes = {
  genres: PropTypes.array.isRequired,
};
