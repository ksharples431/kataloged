export default function getAuthorsFromBooks(books) {
  const authorsMap = new Map();

  books.forEach((book) => {
    const nameParts = book.author.split(' ');

    const [firstName, lastName] =
      nameParts.length === 1
        ? ['', nameParts[0]]
        : [nameParts[0], nameParts[nameParts.length - 1]];

    const authorKey = `${firstName} ${lastName}`;

    if (authorsMap.has(authorKey)) {
      const author = authorsMap.get(authorKey);

      author.updatedAt =
        new Date(book.updatedAt) > new Date(author.updatedAt)
          ? book.updatedAt
          : author.updatedAt;

      author.books.push(book);

      if (book.seriesName && !author.series.includes(book.seriesName)) {
        author.series.push(book.seriesName);
      }
    } else {
      authorsMap.set(authorKey, {
        id: authorKey,
        authorName: authorKey,
        firstName,
        lastName,
        updatedAt: book.updatedAt,
        books: [book], 
        series: book.seriesName ? [book.seriesName] : [], 
      });
    }
  });

  return Array.from(authorsMap.values());
}
