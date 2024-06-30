import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const BookListWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

export const BookListTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
