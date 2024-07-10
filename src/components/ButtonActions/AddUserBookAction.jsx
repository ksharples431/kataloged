import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSuite from '../UI/ButtonSuite';
import { addUserBook } from '../../store/userBooks/userBooksThunks';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AddUserBookAction = ({ bid }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.users.uid); // Assuming you store the user ID in auth slice

  const handleAddToLibrary = () => {
    if (uid) {
      dispatch(addUserBook({ bid, uid }));
    } else {
      // Handle the case where user is not logged in
      console.log('User not logged in');
      // You might want to show a login prompt or redirect to login page here
    }
  };

  const buttons = [
    {
      label: 'Add to my library',
      onClick: () => handleAddToLibrary(),
      icon: <FavoriteIcon />,
      color: 'secondary',
    },
  ];

  return <ButtonSuite buttons={buttons} />;
};

AddUserBookAction.propTypes = {
  bid: PropTypes.string.isRequired,
};

export default AddUserBookAction;
