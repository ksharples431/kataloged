import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const Logo = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginRight: 'auto',
}));

const ToolbarContent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
}));

const ButtonGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const Header = ({ theme }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo variant="h6" noWrap>
          <Link
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}>
            Kataloged
          </Link>
        </Logo>
        <ToolbarContent>
          {isSmallScreen && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
          )}
          {!isSmallScreen && (
            <>
              <ButtonGroup>
                <Button color="inherit">
                  <Link
                    to="/auth/login"
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    Log In
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/auth/signup"
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    Sign Up
                  </Link>
                </Button>
              </ButtonGroup>
            </>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <Link
                to="/auth/login"
                style={{
                  textDecoration: 'none',
                  color: theme.palette.text.secondary,
                }}>
                Login
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/auth/signup"
                style={{
                  textDecoration: 'none',
                  color: theme.palette.text.secondary,
                }}>
                Sign Up
              </Link>
            </MenuItem>
          </Menu>
        </ToolbarContent>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

Header.propTypes = {
  theme: PropTypes.object.isRequired,
};
