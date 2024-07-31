import ButtonSuite from '../components/UI/ButtonSuite';
import  EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';

const BookActions = () => {
  const buttons = [
    {
      label: 'Favorite',
      onClick: () => console.log('Favorite clicked'),
      icon: <FavoriteIcon />,
      color: 'secondary',
    },
    {
      label: 'Share',
      onClick: () => console.log('Share clicked'),
      icon: <ShareIcon />,
      variant: 'outlined',
    },
    {
      label: 'Edit',
      onClick: () => console.log('Edit clicked'),
      icon: <EditIcon />,
      color: 'primary',
    },
  ];

  return <ButtonSuite buttons={buttons} />;
};

export default BookActions;
