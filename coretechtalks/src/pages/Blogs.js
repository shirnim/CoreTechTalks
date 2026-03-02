import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const blogs = [
  {
    id: 1,
    title: 'Getting Started with React: A Beginner\'s Guide',
    excerpt: 'A comprehensive introduction to setting up your first React application and understanding its core concepts.',
    author: 'John Doe',
    date: 'October 26, 2023',
    image: '/placeholder-image-4.jpg',
    category: 'React',
    readTime: '10 min read',
  },
  {
    id: 2,
    title: 'The Evolution of Node.js: A Look at the Last Decade',
    excerpt: 'An in-depth look at the runtime environment that has revolutionized web development and its journey over the years.',
    author: 'Jane Smith',
    date: 'October 28, 2023',
    image: '/placeholder-image-5.jpg',
    category: 'Node.js',
    readTime: '15 min read',
  },
  {
    id: 3,
    title: 'UI/UX Best Practices for High-Converting Landing Pages',
    excerpt: 'Learn the design secrets behind landing pages that not only look good but also drive user action and conversions.',
    author: 'Alex Johnson',
    date: 'November 2, 2023',
    image: '/placeholder-image-6.jpg',
    category: 'UI/UX Design',
    readTime: '8 min read',
  },
];

const Blogs = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="lg" sx={{ maxWidth: '1100px !important' }}>
        <Typography variant="h1" component="h1" sx={{ textAlign: 'center', mb: 8, fontWeight: 700, fontSize: '40px' }}>
          The CoreTechTalks Blog
        </Typography>
        <Grid container spacing={0}>
          {blogs.map((blog, index) => (
            <React.Fragment key={blog.id}>
              <Grid item xs={12}>
                <Card 
                  component={Link} 
                  to={`/blogs/${blog.id}`}
                  sx={{
                    display: { xs: 'block', md: 'flex' }, 
                    mb: 4, 
                    textDecoration: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', md: 350 }, height: { xs: 200, md: 'auto' }, objectFit: 'cover' }}
                    image={blog.image}
                    alt={blog.title}
                  />
                  <CardContent sx={{ p: 4, flex: 1 }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                      {blog.category}
                    </Typography>
                    <Typography variant="h2" component="h2" sx={{ fontSize: '28px', fontWeight: 600, color: 'text.primary', mb: 1 }}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {blog.date} &bull; {blog.author}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {blog.excerpt}
                    </Typography>
                    <Button 
                      variant="text" 
                      endIcon={<ArrowForwardIcon />} 
                      sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              {index < blogs.length - 1 && (
                <Grid item xs={12} sx={{ my: 2 }}>
                  <Divider sx={{ backgroundColor: '#E2E8F0' }} />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blogs;
