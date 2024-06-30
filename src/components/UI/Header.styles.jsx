import styled from '@emotion/styled';
import { alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';

export const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 3px;
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: ${(props) => props.theme.spacing(1)};

  ${(props) => props.theme.breakpoints.up('sm')} {
    flex-direction: row;
    align-items: center;
  }
`;

export const Logo = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing(1)};

  ${(props) => props.theme.breakpoints.up('sm')} {
    font-size: 2rem;
    margin-bottom: 0;
    margin-right: auto;
   
  }
`;

export const ToolbarContent = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${(props) => props.theme.breakpoints.up('sm')} {
    flex-direction: row;
    width: auto;
  }
`;

export const Search = styled('div')`
  position: relative;
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: ${(props) =>
    alpha(props.theme.palette.common.white, 0.15)};
  &:hover {
    background-color: ${(props) =>
      alpha(props.theme.palette.common.white, 0.25)};
  }
  margin-bottom: ${(props) => props.theme.spacing(1)};
  width: 100%;

  ${(props) => props.theme.breakpoints.up('sm')} {
    width: auto;
    margin-bottom: 0;
    margin-right: ${(props) => props.theme.spacing(2)};
  }
`;

export const SearchIconWrapper = styled('div')`
  padding: ${(props) => props.theme.spacing(0, 2)};
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)`
  color: inherit;
  .MuiInputBase-input {
    padding: ${(props) => props.theme.spacing(1, 1, 1, 0)};
    padding-left: ${(props) => `calc(1em + ${props.theme.spacing(4)})`};
    transition: ${(props) => props.theme.transitions.create('width')};
    width: 100%;
    ${(props) => props.theme.breakpoints.up('md')} {
      width: 20ch;
    }
  }
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing(1)};

  ${(props) => props.theme.breakpoints.up('sm')} {
    justify-content: flex-start;
  }
`;
