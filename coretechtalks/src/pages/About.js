
import React from 'react';
import { Box, Typography, Container, Grid, Avatar } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              About CoreTechTalks
            </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" paragraph>
              A community-driven platform for tech enthusiasts to learn, share, and grow.
            </Typography>
            <Typography variant="body1" paragraph>
              CoreTechTalks is a passion project dedicated to providing high-quality content on a variety of technology topics. Our mission is to make complex tech concepts accessible to everyone, from beginners to seasoned professionals.
            </Typography>
            <Typography variant="body1" paragraph>
              We believe in the power of knowledge sharing and strive to create a community where tech enthusiasts can learn, grow, and connect. Whether you're interested in software development, AI, cybersecurity, or the latest tech trends, CoreTechTalks is your go-to resource.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{ width: 250, height: 250 }}
              alt="CoreTechTalks Founder"
              src="/founder-avatar.jpg" // Add a path to an image if you have one
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
