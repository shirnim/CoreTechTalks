import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon, Code as CodeIcon, Brush as BrushIcon, Storage as StorageIcon } from '@mui/icons-material';

const Home = () => {
  const blogPosts = [
    {
      title: 'The Future of Web Development',
      description: 'An in-depth look at emerging trends and technologies shaping the future of the web.',
      readTime: '8 min read',
      category: 'Web Development',
    },
    {
      title: 'Mastering React Hooks',
      description: 'A comprehensive guide to understanding and using React Hooks for more efficient development.',
      readTime: '12 min read',
      category: 'React',
    },
    {
      title: 'UI/UX Design Principles for Developers',
      description: 'Learn key design principles that can help you create more intuitive and user-friendly applications.',
      readTime: '6 min read',
      category: 'UI/UX',
    },
  ];

  const tools = [
    {
      name: 'Code Formatter',
      description: 'A powerful tool to format and beautify your code in various languages.',
      icon: <CodeIcon fontSize="large" color="primary" />,
    },
    {
      name: 'Color Palette Generator',
      description: 'Create stunning color palettes for your projects with ease.',
      icon: <BrushIcon fontSize="large" color="primary" />,
    },
    {
      name: 'SVG Optimizer',
      description: 'Optimize your SVG files for web use, reducing their size without losing quality.',
      icon: <StorageIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box sx={{ py: { xs: 8, md: 16 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
            Modern Tech Insights
          </Typography>
          <Typography variant="h2" component="h2" sx={{ color: 'text.secondary', fontSize: { xs: '24px', md: '30px' }, mb: 4 }}>
            A blog for developers, designers, and tech enthusiasts.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/blogs"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Explore All Posts
          </Button>
        </Container>
      </Box>

      {/* Latest Blog Posts */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" align="left" gutterBottom sx={{ mb: 6 }}>
          Latest Posts
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card component={Link} to="/blogs" sx={{ textDecoration: 'none' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="body2" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                    {post.category}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {post.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.readTime}
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
        <Typography variant="h2" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Our Tools
        </Typography>
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  {tool.icon}
                  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                    {tool.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {tool.description}
                  </Typography>
                  <Button variant="text" color="primary" component={Link} to="/tools" sx={{ mt: 2 }}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <hr className="section-divider" />

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h2" gutterBottom sx={{ mb: 6 }}>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Web Development
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We build modern, responsive, and high-performing websites tailored to your needs.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/services" sx={{ mt: 3 }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  UI/UX Design
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We design beautiful and user-friendly interfaces that provide a seamless user experience.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/services" sx={{ mt: 3 }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
