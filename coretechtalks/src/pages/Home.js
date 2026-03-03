import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const Home = () => {
  const articles = [
    {
      title: 'The Rise of AI in UI/UX Design',
      description: 'How artificial intelligence is revolutionizing the design process and creating more personalized user experiences.',
      image: '/placeholder-image-2.jpg',
      category: 'UI/UX',
      readTime: '8 min read',
    },
    {
      title: 'A Deep Dive into Serverless Technologies',
      description: 'Everything you need to know about serverless computing, its benefits, and how to get started.',
      image: '/placeholder-image-3.jpg',
      category: 'Cloud Computing',
      readTime: '12 min read',
    },
    {
      title: 'The Definitive Guide to Modern Web Architectures',
      description: 'Explore the evolution of web development, from monolithic to microservices, and discover the best architecture for your next project.',
      image: '/placeholder-image-1.jpg', // Placeholder
      category: 'Web Architecture',
      readTime: '15 min read',
    },
  ];

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
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card component={Link} to="/blogs" sx={{ textDecoration: 'none', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                    {article.category}
                  </Typography>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {article.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.readTime}
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
