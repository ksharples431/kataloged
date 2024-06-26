// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// import PageNav from '@/components/UI/PageNav.jsx';
// import SearchBar from '@/components/UI/SearchBar.jsx';
// import LoadingSpinner from '@/components/UI/LoadingSpinner.jsx';

// import styles from './MainCategoryPage.module.css';

// function MainCategoryPage({
//   ListComponent,
//   getItemsFromBooks,
//   itemFields,
//   searchText,
// }) {
//   const { books, loading, error } = useSelector((state) => state.books);
//   const items = getItemsFromBooks(books);
//   const [filteredItems, setFilteredItems] = useState(items);

//   useEffect(() => {
//     setFilteredItems(items);
//   }, [items]);

//   const handleSearch = (searchTerm) => {
//     if (!searchTerm) {
//       setFilteredItems(items);
//       return;
//     }

//     const lowercasedTerm = searchTerm.toLowerCase();
//     const filtered = items.filter((item) =>
//       itemFields.some((field) =>
//         item[field].toLowerCase().includes(lowercasedTerm)
//       )
//     );

//     setFilteredItems(filtered);
//   };

//   return (
//     <div className={styles.page}>
//       <PageNav />
//       <SearchBar text={searchText} onSearch={handleSearch} />
//       {loading && <LoadingSpinner />}
//       {error && <p>Error: {error}</p>}
//       <div>
//         <ListComponent items={filteredItems} />
//       </div>
//     </div>
//   );
// }

// export default MainCategoryPage;
