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

const GenreCard = ({ genre }) => (
  <CardWrapper>
    <LinkWrapper to={`/genres/${genre.name}/books`}>
      <AvatarWrapper>{getInitials(genre.name)}</AvatarWrapper>
    </LinkWrapper>
    <CardContentWrapper>
      <LinkWrapper to={`/genres/${genre.name}/books`}>
        <PrimaryText variant="h6" component="h2">
          {genre.name}
        </PrimaryText>
      </LinkWrapper>
      <SecondaryText variant="body2">
        {genre.bookCount} books
      </SecondaryText>
    </CardContentWrapper>
  </CardWrapper>
);

GenreCard.propTypes = {
  genre: PropTypes.shape({
    gid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bookCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default GenreCard;
