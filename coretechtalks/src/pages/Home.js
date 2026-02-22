
import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box sx={{ py: 12, textAlign: 'center', backgroundColor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h1" component="h1" gutterBottom>
            Welcome to CoreTechTalks
          </Typography>
          <Typography variant="h4" component="h2" color="text.secondary" paragraph>
            Your ultimate destination for tech insights, tutorials, and resources.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/blogs"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: 4 }}
          >
            Explore Blogs
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Web Development
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We build modern, responsive, and high-performing websites tailored to your needs.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Mobile App Development
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We create intuitive and engaging mobile applications for both iOS and Android platforms.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  UI/UX Design
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We design beautiful and user-friendly interfaces that provide a seamless user experience.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 12, textAlign: 'center', backgroundColor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to start a project?
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/contact"
            size="large"
            sx={{ mt: 4 }}
          >
            Get in Touch
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
