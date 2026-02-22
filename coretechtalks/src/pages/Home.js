
import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        sx={{
          py: 8,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to CoreTechTalks
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your ultimate destination for tech insights, tutorials, and resources.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/blogs"
            sx={{ mt: 4 }}
          >
            Explore Blogs
          </Button>
        </Container>
      </Paper>
    </Box>
  );
};

export default Home;
