import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Typography, CardContent, Avatar } from '@mui/material';

const CardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  height: '100%',
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  marginBottom: theme.spacing(2),
  fontSize: '2rem',
  backgroundColor: theme.palette.secondary.main,
}));

const PrimaryText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
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

const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

const UserAuthorCard = ({ author }) => (
  <CardWrapper>
    <LinkWrapper to={`/myAuthors/${author.name}`}>
      <AvatarWrapper>{getInitials(author.name)}</AvatarWrapper>
    </LinkWrapper>
    <CardContentWrapper>
      <LinkWrapper to={`/myAuthors/${author.name}`}>
        <PrimaryText variant="h6" component="h2">
          {author.name}
        </PrimaryText>
      </LinkWrapper>
      <SecondaryText variant="body2">
        {author.bookCount} books
      </SecondaryText>
    </CardContentWrapper>
  </CardWrapper>
);

UserAuthorCard.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bookCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserAuthorCard;
