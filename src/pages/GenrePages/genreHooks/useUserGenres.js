import { useParams } from 'react-router-dom';
import {
  useGetUserGenresQuery,
  useGetUserBooksByGenreQuery,
} from '../../../store/api/apiSlice';
import { useSelector } from 'react-redux';

export const useUserGenres = ({ sortBy = 'name', order = 'asc' } = {}) => {
  const { uid } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetUserGenresQuery({
    uid,
    sortBy,
    order,
  });

  return {
    userGenres: data?.data?.genres || [],
    isLoading,
    isError,
    error,
  };
};

export const useUserGenreBooks = ({
  sortBy = 'title',
  order = 'asc',
} = {}) => {
  const { uid } = useSelector((state) => state.auth);
  const { genre } = useParams();
  const { data, isLoading, isError, error } = useGetUserBooksByGenreQuery(
    {
      uid,
      genre,
      sortBy,
      order,
    },
    {
      skip: !genre || !uid,
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
