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
  Grid,
} from '@mui/material';

import { signup, googleSignIn } from '../../store/slices/auth.slice';
import { setIsSignup } from '../../store/slices/ui.slice';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const DesktopSignup = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const { status, error } = useSelector((state) => state.auth);
  const isSignup = useSelector((state) => state.ui.isSignup);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resultAction = await dispatch(
      signup({ email, password, username })
    );
    if (signup.fulfilled.match(resultAction)) {
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
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={6}>
        <Typography
          variant="h4"
          color={theme.palette.text.primary}
          gutterBottom>
          Sign Up
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={status === 'loading'}>
            Sign Up
          </SubmitButton>

          <Divider style={{ margin: theme.spacing(3, 0) }}>Or</Divider>
          <SubmitButton
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleGoogleSignIn}>
            Sign up with Google
          </SubmitButton>

          <Box mt={3}>
            <Typography
              variant="body1"
              align="center"
              color={theme.palette.text.secondary}>
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/auth/login"
                color="primary"
                onClick={handleToggleSignup}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Form>
      </StyledPaper>
    </Container>
  );
};

export default DesktopSignup;
