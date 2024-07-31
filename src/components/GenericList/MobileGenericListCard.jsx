import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  Typography,
  CardMedia,
  Avatar,
  Box,
} from '@mui/material';

const CardWrapper = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
  width: '100%',
  maxWidth: '100vw',
  height: '70px',
  boxSizing: 'border-box',
}));

const ImageWrapper = styled(CardMedia)(({ theme }) => ({
  width: '46px',
  height: '70px',
  marginRight: theme.spacing(2),
  flexShrink: 0,
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  width: '46px',
  height: '70px',
  fontSize: '1.5rem',
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  flexShrink: 0,
}));

const TextWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
  minWidth: 0,
  height: '100%',
  maxWidth: 'calc(100% - 78px)',
});

const PrimaryText = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '0.9rem',
  color: theme.palette.text.primary,
  maxWidth: 'calc(100% - 78px)',
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: 'calc(100% - 78px)',
}));

const LinkWrapper = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const MobileGenericListCard = ({ item, type }) => {
  const getLink = () => {
    switch (type) {
      case 'book':
        return `/books/${encodeURIComponent(item.id)}`;
      case 'userBook':
        return `/userBooks/${encodeURIComponent(item.id)}`;
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
    if (type.includes('book')) {
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
    return (
      <AvatarWrapper>
        {type.includes('author')
          ? item.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
          : item.name.substring(0, 2).toUpperCase()}
      </AvatarWrapper>
    );
  };

  return (
    <CardWrapper>
      <LinkWrapper to={getLink()}>
        {renderAvatar()}
        <TextWrapper>
          <PrimaryText variant="subtitle1">{item.name}</PrimaryText>
          {item.secondaryText && (
            <SecondaryText variant="body2">
              {item.secondaryText}
            </SecondaryText>
          )}
        </TextWrapper>
      </LinkWrapper>
    </CardWrapper>
  );
};

MobileGenericListCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    secondaryText: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf([
    'book',
    'userBook',
    'author',
    'userAuthor',
    'genre',
    'userGenre',
  ]).isRequired,
};

export default MobileGenericListCard;
