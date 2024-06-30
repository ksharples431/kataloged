import { Box, Typography, IconButton } from '@mui/material';
import styled from '@emotion/styled';

export const CardCatalog = styled(Box)(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 34px;
  background-image: ${theme.palette.mode === 'light' ? theme.customBackgrounds.wood : 'none'};
  background-color: ${theme.palette.mode === 'light' ? 'transparent' : theme.palette.primary.main};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`
);

export const Drawer = styled(Box)(
  ({ theme }) => `
  height: 150px;
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
  border: 1.5px solid #73553d; 
  border:  ${
    theme.palette.mode === 'light' ? `1.5px solid #73553d` : 'none'
  };
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(3px) scale(1.05);
    box-shadow: 0 8px 15px ${theme.palette.action.hover};
    z-index: 1;
  }
`
);


export const DrawerLabel = styled(Typography)(
  ({ theme }) => `
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: ${theme.palette.background.paper};
  padding: 4px 8px;
  border: 10px solid rgb(185, 183, 183);
  border-radius: 6px;
  color: ${theme.palette.primary.main};
  width: 80%;
  height: 45%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  font-weight: bold;
`
);

export const CircularButton = styled(IconButton)(
  ({ theme }) => `
  position: absolute;
  bottom: 10px;
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
