import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const BookCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  height: '100%',
}));

const BookImage = styled(CardMedia)(() => ({
  height: '200px',
  width: '150px',
  objectFit: 'cover',
}));

const BookTitle = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  fontSize: '1rem',
  color: theme.palette.text.primary,
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const LinkWrapper = styled(Link)(({theme}) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const CardContentWrapper = styled(CardContent)(() => ({
  textAlign: 'center',
  padding: '8px 16px',
  paddingBottom: '8px !important',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}));

const DesktopUserBookCard = ({ userBook }) => (
  <BookCardWrapper>
    <LinkWrapper to={`/userBooks/${encodeURIComponent(userBook.ubid)}`}>
      <BookImage
        component="img"
        image={userBook.imagePath || '/placeholder-book.jpg'}
        alt={userBook.title}
      />
    </LinkWrapper>
    <CardContentWrapper>
      <LinkWrapper to={`/userBooks/${encodeURIComponent(userBook.ubid)}`}>
        <BookTitle variant="h6" component="h2">
          {userBook.title}
        </BookTitle>
      </LinkWrapper>
      <LinkWrapper to={`/authors/${encodeURIComponent(userBook.author)}`}>
        <AuthorName variant="body2">{userBook.author}</AuthorName>
      </LinkWrapper>
    </CardContentWrapper>
  </BookCardWrapper>
);

DesktopUserBookCard.propTypes = {
  userBook: PropTypes.shape({
    ubid: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
};

export default DesktopUserBookCard;
