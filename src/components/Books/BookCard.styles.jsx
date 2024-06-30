import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography } from '@mui/material';

export const BookCardWrapper = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 0,
  // borderRadius: '10px',
  overflow: 'hidden',
}));

export const BookImage = styled(CardMedia)({
  height: '200px',
  width: '150px',
  objectFit: 'cover',
  // borderRadius: '10px',
  marginBottom: '10px',
});

export const BookTitle = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const AuthorName = styled(Typography)({
  // Add any specific styles for author name here
});
