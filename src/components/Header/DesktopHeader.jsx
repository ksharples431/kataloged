import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/users/users.thunks';
import { setIsSignup } from '../../store/users/users.slice';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Logo = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginRight: 'auto',
}));

const DesktopHeader = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated ?? false
  );
  const isSignup = useSelector((state) => state.ui.isSignup ?? false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSignupMode = () => {
    dispatch(setIsSignup(!isSignup));
  };

const menuItems = [
  // Add the "Search the catalog" button only for authenticated users
  ...(isAuthenticated
    ? [
        {
          text: 'Search the catalog',
          link: '/search',
        },
      ]
    : []),
  // Then add the conditional auth items
  ...(isAuthenticated
    ? [{ text: 'Log Out', onClick: handleLogout }]
    : [
        {
          text: isSignup ? 'Sign Up' : 'Log In',
          link: isSignup ? '/auth/signup' : '/auth/login',
          onClick: toggleSignupMode,
        },
      ]),
];

  return (
    <>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Logo variant="h6" noWrap>
            <Link
              to="/"
              style={{ textDecoration: 'none', color: 'inherit' }}>
              Kataloged
            </Link>
          </Logo>
          <ButtonGroup>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={item.onClick}
                component={item.link ? Link : 'button'}
                to={item.link}>
                {item.text}
              </Button>
            ))}
          </ButtonGroup>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};

export default DesktopHeader;
