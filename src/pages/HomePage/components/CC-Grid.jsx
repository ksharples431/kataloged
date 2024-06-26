import CCDrawer from './CC-Drawer.jsx';
import styles from './CC-Grid.module.css';

const items = [
  { address: '/books', title: 'My Books' },
  { address: '/authors', title: 'Authors' },
  { address: '/genres', title: 'Genres' },
  { address: '/series', title: 'Series' },
  { address: '/my-queue', title: 'My Queue' },
  { address: '/account', title: 'Account' },
];

export default function CCGrid() {
  return (
    <div className={styles.gridContainer}>
      {items.map((item) => (
        <CCDrawer
          key={item.title}
          className={styles.gridItem}
          title={item.title}
          address={item.address}></CCDrawer>
      ))}
    </div>
  );
}
