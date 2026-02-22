
import React from 'react';
import { Box, Typography, Container, Paper, Avatar } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 150, height: 150, mb: 2 }}
              alt="CoreTechTalks Founder"
              src="/founder-avatar.jpg" // Add a path to an image if you have one
            />
            <Typography variant="h4" component="h1" gutterBottom>
              About CoreTechTalks
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              CoreTechTalks is a passion project dedicated to providing high-quality content
              on a variety of technology topics. Our mission is to make complex tech concepts
              accessible to everyone, from beginners to seasoned professionals.
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              We believe in the power of knowledge sharing and strive to create a community
              where tech enthusiasts can learn, grow, and connect. Whether you're interested
              in software development, AI, cybersecurity, or the latest tech trends,
              CoreTechTalks is your go-to resource.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
