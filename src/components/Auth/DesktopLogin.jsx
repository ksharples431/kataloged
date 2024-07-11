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
// import {
  // useLoginMutation,
  // useGoogleSigninMutation,
// } from '../../store/api/api.slice';
// import { setUser } from '../../store/auth/auth.slice';
import { setIsSignup } from '../../store/ui/ui.slice';
// import LoadingSpinner from '../UI/LoadingSpinner';
// import ErrorMessage from '../UI/ErrorMessage';
import { googleSignin } from '../../store/auth/auth.thunks';

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

const DesktopLogin = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isSignup } = useSelector((state) => state.ui);



  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const userData = await login({ email, password }).unwrap();
  //     dispatch(setUser(userData));
  //     navigate('/');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

 const handleGoogleSignin = async () => {
   const resultAction = await dispatch(googleSignin().unwrap());
   if (googleSignin.fulfilled.match(resultAction)) {
     navigate('/');
   }
  };
  // const handleGoogleSignIn = async () => {
  //   try {
  //     console.log('Attempting google signin')
  //     const userData = await googleSignIn().unwrap();
  //     dispatch(setUser(userData));
  //     navigate('/');
  //   } catch (err) {
  //     // Error is handled by RTK Query
  //   }
  // };

  const handleToggleSignup = () => {
    dispatch(setIsSignup(!isSignup));
  };

  // if (isLoginLoading || isGoogleSigninLoading) {
  //   return <LoadingSpinner />;
  // }

  // const error = loginError || googleSigninError;
  // if (error) {
  //   return (
  //     <ErrorMessage message={error.data?.message || 'An error occurred'} />
  //   );
  // }

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={6}>
        <Typography
          variant="h4"
          color={theme.palette.text.primary}
          gutterBottom>
          Log In
        </Typography>
        {/* <Form onSubmit={handleSubmit}> */}
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
            // disabled={isLoginLoading}
            >
            Log In
          </SubmitButton>

          <Divider style={{ margin: theme.spacing(3, 0) }}>Or</Divider>
          <SubmitButton
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleGoogleSignin}
            // disabled={isGoogleSigninLoading}
            >
            Log in with Google
          </SubmitButton>
          <Box mt={3}>
            <Typography
              variant="body1"
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
        {/* </Form> */}
      </StyledPaper>
    </Container>
  );
};

export default DesktopLogin;
