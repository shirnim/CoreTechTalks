import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { blogs } from '../data/blogs';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, overflowX: 'hidden', bgcolor: '#F8FAFC' }}>
      {/* Hero Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 }, 
        textAlign: 'center',
        background: 'linear-gradient(180deg, #F1F5F9 0%, #FFFFFF 100%)',
        mb: 8
      }}>
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
            Insights That Build the Future
          </Typography>
          <Typography variant="h2" sx={{ color: 'text.secondary', fontSize: { xs: '22px', md: '32px' }, mb: 4 }}>
            Your essential source for expert analysis, practical tools, and in-depth guides on modern technology.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/blogs"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Explore Articles
          </Button>
        </Container>
      </Box>

      {/* Featured Articles Section */}
      <Container maxWidth="lg" sx={{ py: 6, mb: 8 }}>
        <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Featured Articles</Typography>
        <Grid container spacing={5} justifyContent="center">
          {blogs.slice(0, 3).map((blog, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card component={Link} to={`/blogs/${blog.slug}`} sx={{ textDecoration: 'none', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                    {blog.category}
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {blog.excerpt}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.readTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
