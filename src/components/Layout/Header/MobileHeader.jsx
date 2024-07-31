import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../../store/api/authApiSlice';
import { setIsSignup } from '../../../store/slices/uiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));

const MobileHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const logout = useLogoutMutation();
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated ?? false
  );
  const isSignup = useSelector((state) => state.ui.isSignup ?? false);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setIsDrawerOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleSignupMode = () => {
    dispatch(setIsSignup(!isSignup));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const menuItems = [
    ...(isAuthenticated
      ? [
          {
            text: 'Add a book',
            icon: <SearchIcon />,
            onClick: () => handleNavigation('/search'),
          },
          {
            text: 'My Books',
            icon: <BookIcon />,
            onClick: () => handleNavigation('/books'),
          },
          {
            text: 'My Authors',
            icon: <PersonIcon />,
            onClick: () => handleNavigation('/authors'),
          },
          {
            text: 'My Genres',
            icon: <CategoryIcon />,
            onClick: () => handleNavigation('/genres'),
          },
          { text: 'Log Out', icon: <LogoutIcon />, onClick: handleLogout },
        ]
      : [
          {
            text: isSignup ? 'Sign Up' : 'Log In',
            icon: <LoginIcon />,
            onClick: () => {
              handleNavigation(isSignup ? '/auth/signup' : '/auth/login');
              toggleSignupMode();
            },
          },
        ]),
    {
      text: 'About Us',
      icon: <InfoOutlinedIcon />,
      onClick: () => handleNavigation('/about'),
    },
  ];

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <Logo variant="h6" component="div">
            <Link
              to="/"
              style={{ textDecoration: 'none', color: 'inherit' }}>
              Kataloged
            </Link>
          </Logo>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
      <StyledDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={item.onClick}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  style: { color: theme.palette.text.primary },
                }}
              />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default MobileHeader;
