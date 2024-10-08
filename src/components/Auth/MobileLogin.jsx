import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Link,
  Divider,
  useTheme,
} from '@mui/material';

import { login, googleSignIn } from '../../store/slices/authSlice';
import { setIsSignup } from '../../store/slices/uiSlice';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0, 1),
}));

const CustomDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  color: theme.palette.primary.main, // Adjust this to use your desired color
}));


const MobileLogin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useSelector((state) => state.auth);
  const isSignup = useSelector((state) => state.ui.isSignup);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  const handleGoogleSignIn = async () => {
    const resultAction = await dispatch(googleSignIn());
    if (googleSignIn.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  const handleToggleSignup = () => {
    dispatch(setIsSignup(!isSignup));
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography
          variant="h5"
          color={theme.palette.main.slateBlue}
          align="center">
          Log In
        </Typography>
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: { color: 'primary.main' },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: { color: 'primary.main' },
            }}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={status === 'loading'}>
            Log In
          </SubmitButton>

          <CustomDivider>Or</CustomDivider>
          <SubmitButton
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleGoogleSignIn}>
            Log in with Google
          </SubmitButton>

          <Box mt={2}>
            <Typography
              variant="body2"
              align="center"
              color={theme.palette.text.secondary}>
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink}
                to="/auth/signup"
                color="primary"
                onClick={handleToggleSignup}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Form>
      </StyledPaper>
    </Container>
  );
};

export default MobileLogin;
