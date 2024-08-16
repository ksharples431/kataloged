import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';
import HeaderActions from '../../Actions/HeaderActions.jsx';

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
        <HeaderActions />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default DesktopHeader;
