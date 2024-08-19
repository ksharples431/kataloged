import { useParams } from 'react-router-dom';
import {
  useGetAuthorsQuery,
  useGetBooksByAuthorQuery,
} from '../../../store/api/apiSlice';

export const useAuthors = ({ sortBy = 'name', order = 'asc' } = {}) => {
  const { data, isLoading, isError, error } = useGetAuthorsQuery({
    sortBy,
    order,
  });

  return {
    authors: data?.data?.authors || [],
    isLoading,
    isError,
    error,
  };
};

export const useAuthorBooks = ({
  sortBy = 'title',
  order = 'asc',
} = {}) => {
  const { author } = useParams();
  const { data, isLoading, isError, error } = useGetBooksByAuthorQuery(
    {
      author,
      sortBy,
      order,
    },
    {
      skip: !author,
    }
  );

  return {
    books: data?.data?.books || [],
    authorName: author,
    isLoading,
    isError,
    error,
  };
};
