
import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: 'Getting Started with React',
    excerpt: 'A beginner-friendly guide to setting up your first React application.',
    author: 'John Doe',
    date: 'October 26, 2023',
    image: '/react-blog-post.jpg', // Add a path to an image if you have one
  },
  {
    id: 2,
    title: 'Understanding Node.js',
    excerpt: 'An in-depth look at the runtime environment that has revolutionized web development.',
    author: 'Jane Smith',
    date: 'October 28, 2023',
    image: '/node-blog-post.jpg', // Add a path to an image if you have one
  },
  // Add more blog posts here
];

const Blogs = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Our Blog
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2">
                    {blog.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {blog.date} by {blog.author}
                  </Typography>
                  <Typography variant="body2">{blog.excerpt}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/blogs/${blog.id}`}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blogs;
