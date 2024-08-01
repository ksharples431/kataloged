import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  Avatar,
} from '@mui/material';

const CardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  height: '100%',
}));

const ImageWrapper = styled(CardMedia)(({theme}) => ({
  height: '200px',
  width: '150px',
  overflow: 'hidden',
  marginBottom: theme.spacing(1),
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  height: '200px',
  width: '150px',
  fontSize: '3rem',
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
}));

const PrimaryText = styled(Typography)(({ theme }) => ({
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

const SecondaryText = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  whiteSpace: 'normal',
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

const DesktopGenericListCard = ({ item, type }) => {
  const getLink = () => {
    switch (type) {
      case 'book':
        return `/books/${encodeURIComponent(item.id)}`;
      case 'userBook':
        return `/userBooks/${encodeURIComponent(item.id)}`;
      case 'search':
        return `/search/${encodeURIComponent(item.bid || item.id)}`;
      case 'author':
        return `/authors/${encodeURIComponent(item.name)}`;
      case 'userAuthor':
        return `/myAuthors/${encodeURIComponent(item.name)}`;
      case 'genre':
        return `/genres/${encodeURIComponent(item.name)}`;
      case 'userGenre':
        return `/myGenres/${encodeURIComponent(item.name)}`;
      default:
        return '/';
    }
  };

  const renderAvatar = () => {
    if (type === 'book' || type === 'userBook' || type === 'search') {
      return (
        <ImageWrapper>
          <img
            src={item.imagePath || '/placeholder-book.jpg'}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ImageWrapper>
      );
    }
    if (type.includes('author')) {
      return (
        <AvatarWrapper>
          {item.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </AvatarWrapper>
      );
    }
    return <AvatarWrapper>{item.name}</AvatarWrapper>;
  };

  return (
    <CardWrapper>
      <LinkWrapper to={getLink()}>{renderAvatar()}</LinkWrapper>
      <CardContentWrapper>
        <LinkWrapper to={getLink()}>
          <PrimaryText variant="h6" component="h2">
            {item.name}
          </PrimaryText>
        </LinkWrapper>
        {item.secondaryText && (
          <SecondaryText variant="body2">
            {item.secondaryText}
          </SecondaryText>
        )}
      </CardContentWrapper>
    </CardWrapper>
  );
};

DesktopGenericListCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    bid: PropTypes.string,
    name: PropTypes.string,
    imagePath: PropTypes.string,
    secondaryText: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf([
    'book',
    'userBook',
    'search',
    'author',
    'userAuthor',
    'genre',
    'userGenre',
  ]).isRequired,
};

export default DesktopGenericListCard;
