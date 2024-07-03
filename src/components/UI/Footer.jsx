import { Grid, Box, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <Box
        component="footer"
        height="80px"
        bgcolor={theme.palette.primary.main}
        p={2}
        color="white"
        display="flex"
        alignItems="center" // Center vertically
        justifyContent="center" // Center horizontally
      >
        © 2024 KSharpCreations
      </Box>
    </Grid>
  );
};

export default Footer;
