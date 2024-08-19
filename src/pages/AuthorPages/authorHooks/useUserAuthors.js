import { useParams } from 'react-router-dom';
import {
  useGetUserAuthorsQuery,
  useGetUserBooksByAuthorQuery,
} from '../../../store/api/apiSlice';
import { useSelector } from 'react-redux';

export const useUserAuthors = ({
  sortBy = 'name',
  order = 'asc',
} = {}) => {
  const { uid } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetUserAuthorsQuery({
    uid,
    sortBy,
    order,
  });

  return {
    userAuthors: data?.data?.authors || [],
    isLoading,
    isError,
    error,
  };
};

export const useUserAuthorBooks = ({
  sortBy = 'title',
  order = 'asc',
} = {}) => {
  const { uid } = useSelector((state) => state.auth);
  const { author } = useParams();
  const { data, isLoading, isError, error } = useGetUserBooksByAuthorQuery(
    {
      uid,
      author,
      sortBy,
      order,
    },
    {
      skip: !author || !uid,
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
