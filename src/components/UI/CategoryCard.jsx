import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ item, name }) => {
  const count = item.books.length
  return (
      <Link to={`/${encodeURIComponent(name)}/${encodeURIComponent(item.id)}`}>
        <div className={styles.card}>
          {item.id}
        <div className={styles.count}>({count})</div>
        </div>
      </Link>
  );
};

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired, 
  name: PropTypes.string.isRequired,
};

export default CategoryCard;
