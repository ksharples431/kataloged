import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  LibraryBooks,
  Search,
  Person,
  Category,
  Bookmark,
} from '@mui/icons-material';

const AboutPage = () => {
  const theme = useTheme();
  const textColor = theme.palette.main.slateBlue;
  const headerColor = theme.palette.main.lightGray

  const textStyle = {
    color: textColor,
  };

  const headerStyle = {
    color: headerColor,
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        {/* <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={headerStyle}>
          Get to know Kataloged
        </Typography> */}

        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={textStyle}>
            Welcome to Kataloged!
          </Typography>
          <Typography variant="body1" paragraph sx={textStyle}>
            Kataloged is your personal digital library assistant, designed
            to help book lovers organize, discover, and enjoy their
            literary collections like never before.
          </Typography>
          <Typography variant="body1" paragraph sx={textStyle}>
            Whether you&apos;re an avid reader with hundreds of books or
            just starting your collection, Kataloged provides the tools you
            need to catalog, manage, and explore your personal library with
            ease.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={textStyle}>
                Key Features
              </Typography>
              <List>
                {[
                  {
                    icon: <LibraryBooks />,
                    primary: 'Personal Library Management',
                    secondary:
                      'Catalog and organize your books effortlessly',
                  },
                  {
                    icon: <Search />,
                    primary: 'Advanced Search',
                    secondary:
                      'Find books quickly with powerful search options',
                  },
                  {
                    icon: <Person />,
                    primary: 'Author Tracking',
                    secondary:
                      'Keep track of your favorite authors and their works',
                  },
                  {
                    icon: <Category />,
                    primary: 'Genre Classification',
                    secondary:
                      'Organize books by genres for easy browsing',
                  },
                  {
                    icon: <Bookmark />,
                    primary: 'Series Management',
                    secondary:
                      'Keep track of book series and your reading progress',
                  },
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ color: textColor }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={textStyle}>
                          {item.primary}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ ...textStyle, opacity: 0.7 }}>
                          {item.secondary}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={textStyle}>
                How It Works
              </Typography>
              {[
                'Sign Up: Create your free account to get started.',
                'Add Books: Manually add books or use our search feature to find and add books quickly.',
                'Organize: Categorize your books by author, genre, series, or create custom shelves.',
                'Explore: Discover new books based on your reading preferences and library content.',
                'Track: Keep track of your reading progress, favorites, and wish list.',
                'Enjoy: Spend less time managing and more time enjoying your books!',
              ].map((step, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  paragraph
                  sx={textStyle}>
                  {`${index + 1}. ${step}`}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            align="center"
            sx={headerStyle}>
            Start Your Digital Library Journey Today!
          </Typography>
          <Typography variant="body1" align="center" sx={headerStyle}>
            Join Kataloged and transform the way you interact with your
            book collection.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;
