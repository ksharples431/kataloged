import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const BookCard = ({ book }) => (
  <Card sx={{ width: 220 }}>
    <CardMedia
      image={book.imageUrl}
      alt={book.title}
      sx={{ height: 140 }}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {book.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {book.author}
      </Typography>
    </CardContent>
  </Card>
);

const BooksList = ({ books }) => (
  <Grid container spacing={2}>
    {books.map((book) => (
      <Grid item key={book.id} xs={12} sm={6} md={4}>
        <BookCard book={book} />
      </Grid>
    ))}
  </Grid>
);

export default BooksList;
