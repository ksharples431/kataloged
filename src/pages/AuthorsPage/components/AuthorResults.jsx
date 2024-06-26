import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import styles from './AuthorResults.module.css'; 
import CategoryCard from '@/components/UI/CategoryCard.jsx';

export default function AuthorResults({ authors }) {
  // function getAvatarUrl(initials) {
  //   return `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&size=128`;
  // }

  return (
    <div className={styles.authorList}>
      {authors.map((author) => (
        <div key={author.id} className={styles.authorItem}>
          <CategoryCard item={author} name="authors" />
          {/* <Link to={`/authors/${encodeURIComponent(author.id)}`}>
            <img
              src={getAvatarUrl(author.authorInitials)}
              alt={author.title}
              className={styles.authorImage}
            />
          </Link>

          <div className={styles.authorDetails}>
            <Link to={`/authors/${encodeURIComponent(author.id)}`}>
              <h3 className={styles.authorName}>{author.id}</h3>
            </Link>
          </div> */}
        </div>
      ))}
    </div>
  );
}


AuthorResults.propTypes = {
  authors: PropTypes.array.isRequired,
};
