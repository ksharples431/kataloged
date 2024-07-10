import PropTypes from 'prop-types';
import { Box, Button, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/system';

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: theme.spacing(1),
  },
}));

const ButtonsSuite = ({ buttons }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ButtonContainer>
      {buttons.map((button, index) => (
        <StyledButton
          key={index}
          variant={button.variant || 'contained'}
          color={button.color || 'primary'}
          onClick={button.onClick}
          startIcon={button.icon}
          size={isMobile ? 'small' : 'medium'}
          fullWidth={isMobile}>
          {button.label}
        </StyledButton>
      ))}
    </ButtonContainer>
  );
};

ButtonsSuite.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.string,
      color: PropTypes.string,
      icon: PropTypes.node,
    })
  ).isRequired,
};

export default ButtonsSuite;
