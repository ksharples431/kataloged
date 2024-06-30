import { Button, IconButton } from '@mui/material';
import { useTheme as useCustomTheme } from '../../theme/themeUtils.js'; // Update this path
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  StyledAppBar,
  StyledToolbar,
  Logo,
  ToolbarContent,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  ButtonGroup,
} from './Header.styles.jsx';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo variant="h6" noWrap>
          Kataloged
        </Logo>
        <ToolbarContent>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <ButtonGroup>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
          </ButtonGroup>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ToolbarContent>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
