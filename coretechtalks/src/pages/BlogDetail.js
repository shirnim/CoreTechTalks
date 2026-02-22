
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Paper } from '@mui/material';

const blogs = [
  {
    id: 1,
    title: 'Getting Started with React',
    content: 'Full content of the React blog post...',
    author: 'John Doe',
    date: 'October 26, 2023',
  },
  {
    id: 2,
    title: 'Understanding Node.js',
    content: 'Full content of the Node.js blog post...',
    author: 'Jane Smith',
    date: 'October 28, 2023',
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <Box sx={{ flexGrow: 1, py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Blog post not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {blog.title}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {blog.date} by {blog.author}
          </Typography>
          <Typography variant="body1" paragraph>
            {blog.content}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default BlogDetail;
