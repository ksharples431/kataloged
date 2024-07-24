import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/auth.slice.js';
import { setIsSignup } from '../../store/slices/ui.slice';
import { Link } from 'react-router-dom';
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
  useTheme,
} from '@mui/material';

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
  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated ?? false
  );
  const isSignup = useSelector((state) => state.ui.isSignup ?? false);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDrawerOpen(false);
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
          keepMounted: true, // Better open performance on mobile
        }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={item.onClick || handleDrawerToggle}
              component={item.link ? Link : 'li'}
              to={item.link}>
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
