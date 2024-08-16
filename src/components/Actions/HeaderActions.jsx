import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../store/api/authApiSlice';
import { setIsSignup } from '../../store/slices/uiSlice';
import ButtonSuite from '../UI/ButtonSuite';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const HeaderActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated ?? false
  );
  const isSignup = useSelector((state) => state.ui.isSignup ?? false);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleSignupMode = () => {
    dispatch(setIsSignup(!isSignup));
  };

  const handleAuthNavigation = () => {
    const path = isSignup ? '/auth/signup' : '/auth/login';
    navigate(path);
    toggleSignupMode();
  };

  const buttons = [
    {
      label: 'Find a Book',
      onClick: () => navigate('/search'),
      icon: <SearchIcon />,
      color: 'secondary',
    },
    ...(isAuthenticated
      ? [
          {
            label: 'Add a Book',
            onClick: () => navigate('/books/add'),
            icon: <AddIcon />,
            color: 'secondary',
          },
          {
            label: 'Log Out',
            onClick: handleLogout,
            icon: <LogoutIcon />,
            color: 'secondary',
            disabled: isLoggingOut,
          },
        ]
      : [
          {
            label: isSignup ? 'Sign Up' : 'Log In',
            onClick: handleAuthNavigation,
            icon: <LoginIcon />,
            color: 'secondary',
          },
        ]),
    {
      label: 'About Us',
      onClick: () => navigate('/about'),
      icon: <InfoOutlinedIcon />,
      color: 'secondary',
    },
  ];

  return <ButtonSuite buttons={buttons} />;
};

export default HeaderActions;
