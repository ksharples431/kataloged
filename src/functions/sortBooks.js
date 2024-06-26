export default function sortBooks(books, sortCriteria) {
  switch (sortCriteria) {
    case 'title':
      return [...books].sort((a, b) => {
        const regex = /^(A|An|The)\s/i;

        const titleA = a.title.replace(regex, '');
        const titleB = b.title.replace(regex, '');

        return titleA.localeCompare(titleB);
      });
    case 'author':
      return [...books].sort((a, b) => {
        const getLastName = (name) => {
          const nameArray = name.split(' ');
          return nameArray[nameArray.length - 1];
        };

        const aLastName = getLastName(a.author);
        const bLastName = getLastName(b.author);

        return aLastName.localeCompare(bLastName);
      });
    case 'updatedAt':
      return [...books].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        if (isNaN(dateA) || isNaN(dateB)) {
          return 0;
        }

        return dateB - dateA;
      });
    default:
      return books;
  }
}