export default function filterBooksByGenre(books) {
  const genresMap = new Map();

  books.forEach((book) => {
    const genreKey = book.genre;

    if (genresMap.has(genreKey)) {
      const genre = genresMap.get(genreKey);

      genre.updatedAt =
        new Date(book.updatedAt) > new Date(genre.updatedAt)
          ? book.updatedAt
          : genre.updatedAt;

      genre.books.push(book); 

      if (book.seriesName && !genre.series.includes(book.seriesName)) {
        genre.series.push(book.seriesName);
      }
    } else {
      genresMap.set(genreKey, {
        id: genreKey,
        genreName: genreKey,
        updatedAt: book.updatedAt,
        books: [book],
        series: book.seriesName ? [book.seriesName] : [],
      });
    }
  });

  return Array.from(genresMap.values());
}
