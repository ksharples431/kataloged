export default function sortGenres(genres, sortCriteria) {
  switch (sortCriteria) {
    case 'genreName':
      return [...genres].sort((a, b) =>
        a.genreName.localeCompare(b.genreName)
      );

    case 'genreNameDesc':
      return [...genres].sort((a, b) =>
        b.genreName.localeCompare(a.genreName)
      );
      // double check this once GenreViewPage is created
    case 'updatedAt':
      return [...genres].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        if (isNaN(dateA) || isNaN(dateB)) {
          return 0;
        }

        return dateB - dateA;
      });
    default:
      return genres;
  }
}
