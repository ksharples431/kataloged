import { useParams } from 'react-router-dom';
import {
  useGetGenresQuery,
  useGetBooksByGenreQuery,
} from '../../../store/api/apiSlice';

export const useGenres = ({ sortBy = 'name', order = 'asc' } = {}) => {
  const { data, isLoading, isError, error } = useGetGenresQuery({
    sortBy,
    order,
  });

  return {
    genres: data?.data?.genres || [],
    isLoading,
    isError,
    error,
  };
};

export const useGenreBooks = ({
  sortBy = 'title',
  order = 'asc',
} = {}) => {
  const { genre } = useParams();
  const { data, isLoading, isError, error } = useGetBooksByGenreQuery(
    {
      genre,
      sortBy,
      order,
    },
    {
      skip: !genre,
    }
  );

  return {
    books: data?.data?.books || [],
    genreName: genre,
    isLoading,
    isError,
    error,
  };
};
