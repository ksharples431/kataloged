import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Typography, CardContent, Avatar } from '@mui/material';

const AuthorCardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  height: '100%',
}));

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  fontSize: '3rem',
  marginBottom: theme.spacing(1),
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
  fontSize: '1rem',
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

const BookCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const LinkWrapper = styled(Link)(({ theme }) => ({
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

const UserAuthorListCard = ({ author }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AuthorCardWrapper>
      <LinkWrapper to={`/myAuthors/${encodeURIComponent(author.author)}`}>
        <AuthorAvatar>{getInitials(author.author)}</AuthorAvatar>
      </LinkWrapper>
      <CardContentWrapper>
        <LinkWrapper
          to={`/myAuthors/${encodeURIComponent(author.author)}`}>
          <AuthorName variant="h6" component="h2">
            {author.author}
          </AuthorName>
        </LinkWrapper>
        <BookCount variant="body2">
          {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
        </BookCount>
      </CardContentWrapper>
    </AuthorCardWrapper>
  );
};

UserAuthorListCard.propTypes = {
  author: PropTypes.shape({
    author: PropTypes.string.isRequired,
    bookCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserAuthorListCard;
