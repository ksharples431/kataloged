import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../store/api/authApiSlice';
import { setIsSignup } from '../../store/slices/uiSlice';
import ButtonSuite from '../UI/ButtonSuite';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
// import InfoIcon from '@mui/icons-material/Info';
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
      // You might want to navigate to the home page or show a message after logout
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
      // You might want to show an error message to the user
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
    ...(isAuthenticated
      ? [
          {
            label: 'Add a book',
            onClick: () => navigate('/search'),
            icon: <SearchIcon />,
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
