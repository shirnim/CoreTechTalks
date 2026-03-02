
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Paper, Avatar, Grid } from '@mui/material';

const blogs = [
  {
    id: 1,
    title: 'Getting Started with React',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
    author: 'John Doe',
    authorAvatar: '/john-doe.jpg',
    date: 'October 26, 2023',
    image: '/react-blog-post.jpg',
  },
  {
    id: 2,
    title: 'Understanding Node.js',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
    author: 'Jane Smith',
    authorAvatar: '/jane-smith.jpg',
    date: 'October 28, 2023',
    image: '/node-blog-post.jpg',
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <Box className="page-shell" sx={{ flexGrow: 1, py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Blog post not found</Typography>
      </Box>
    );
  }

  return (
    <Box className="page-shell" sx={{ flexGrow: 1, py: 8, backgroundColor: 'transparent' }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h2" component="h1" gutterBottom>
            {blog.title}
          </Typography>
          <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Grid item>
              <Avatar src={blog.authorAvatar} alt={blog.author} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{blog.author}</Typography>
              <Typography variant="subtitle2" color="text.secondary">{blog.date}</Typography>
            </Grid>
          </Grid>
          <Box
            component="img"
            src={blog.image}
            alt={blog.title}
            sx={{ width: '100%', height: 'auto', mb: 4, borderRadius: 1 }}
          />
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {blog.content}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default BlogDetail;
