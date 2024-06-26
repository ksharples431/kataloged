export default function sortAuthors(authors, sortCriteria) {
  switch (sortCriteria) {
    case 'firstName':
      return [...authors].sort((a, b) => {
        const aFirstName = a.firstName || a.lastName;
        const bFirstName = b.firstName || b.lastName;
        return aFirstName.localeCompare(bFirstName);
      });

    case 'lastName':
      return [...authors].sort((a, b) => {
        return a.lastName.localeCompare(b.lastName);
      });
    case 'updatedAt':
      return [...authors].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        if (isNaN(dateA) || isNaN(dateB)) {
          return 0;
        }

        return dateB - dateA;
      });
    default:
      return authors;
  }
}
