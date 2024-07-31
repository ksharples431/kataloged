import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';

const CardCatalogContainer = styled(Box)(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
  background-image: ${
    theme.palette.mode === 'light' ? theme.customBackgrounds.wood : 'none'
  };
  background-color: ${
    theme.palette.mode === 'light'
      ? 'transparent'
      : theme.palette.primary.main
  };
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`
);

const Drawer = styled(Box)(
  ({ theme }) => `
  height: 100px;
  width: 100%;
  background-image: ${
    theme.palette.mode === 'light' ? theme.customBackgrounds.wood : 'none'
  };
  background-color: ${
    theme.palette.mode === 'light'
      ? 'transparent'
      : theme.palette.secondary.light
  };
  background-size: cover;
  background-position: center;
  border: ${
    theme.palette.mode === 'light' ? `1.5px solid #73553d` : 'none'
  };
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:active {
    transform: translateY(2px);
  }
`
);

const DrawerLabel = styled(Typography)(
  ({ theme }) => `
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: ${theme.palette.background.paper};
  padding: 4px 8px;
  border: 6px solid rgb(185, 183, 183);
  border-radius: 4px;
  color: ${theme.palette.primary.main};
  width: 85%;
  height: 50%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  font-weight: bold;
`
);

const CircularButton = styled(IconButton)(
  ({ theme }) => `
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(185, 183, 183);
  color: ${theme.palette.background.paper};
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(185, 183, 183);
  }
`
);

const MobileCardCatalog = ({ drawers }) => (
  <CardCatalogContainer>
    {drawers.map(({ label, path }, index) => (
      <Link
        key={index}
        to={path}
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <Drawer>
          <DrawerLabel variant="body2">{label}</DrawerLabel>
          <CircularButton size="small" />
        </Drawer>
      </Link>
    ))}
  </CardCatalogContainer>
);

export default MobileCardCatalog;

MobileCardCatalog.propTypes = {
  drawers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
