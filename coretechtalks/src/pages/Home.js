import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon, Code as CodeIcon, Brush as BrushIcon, Storage as StorageIcon } from '@mui/icons-material';

const Home = () => {
  const featuredArticle = {
    title: 'The Definitive Guide to Modern Web Architectures',
    description: 'Explore the evolution of web development, from monolithic to microservices, and discover the best architecture for your next project.',
    image: '/placeholder-image-1.jpg', // Placeholder
    category: 'Web Architecture',
    readTime: '15 min read',
  };

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
  ];

  const tools = [
    {
      name: 'Code Validator',
      description: 'Ensure your code meets the latest standards with our powerful and intuitive validator.',
      icon: <CodeIcon fontSize="large" color="primary" />,
    },
    {
      name: 'Design Asset Generator',
      description: 'Quickly create beautiful design assets, from color palettes to UI elements.',
      icon: <BrushIcon fontSize="large" color="primary" />,
    },
    {
      name: 'API Load Tester',
      description: 'Simulate heavy traffic to your API to ensure it's robust and scalable.',
      icon: <StorageIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
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
      <Container maxWidth="lg" sx={{ mb: 10 }}>
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
      
      <hr className="section-divider" />

      {/* Tools Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h2">Developer Tools</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: '600px', mx: 'auto' }}>
            A collection of powerful tools to streamline your workflow and enhance your productivity.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                {tool.icon}
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                  {tool.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {tool.description}
                </Typography>
                <Button variant="text" color="primary" component={Link} to="/tools">
                  Try Tool
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
};

export default Home;
