import React from 'react';
import { Box, Typography, Container, Grid, Avatar } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="lg" sx={{ maxWidth: '1100px !important' }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, fontSize: '42px', mb: 2 }}>
              About CoreTechTalks
            </Typography>
            <Typography variant="h5" component="h2" sx={{ color: 'text.secondary', fontSize: '20px', mb: 3 }}>
              Your definitive source for expert analysis and practical guidance in technology.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.7, color: 'text.primary', mb: 2 }}>
              CoreTechTalks is a modern technology platform dedicated to delivering high-quality insights across software development, AI, data science, and emerging technologies. Our mission is to empower professionals and aspiring technologists by demystifying complex topics and providing actionable knowledge.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.7, color: 'text.primary' }}>
              We are committed to fostering a community of innovation and continuous learning. By connecting experts and enthusiasts, we facilitate conversations that push the boundaries of technology and inspire professional growth.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{ width: 250, height: 250, bgcolor: 'primary.main' }}
              alt="CoreTechTalks Platform"
              src="/placeholder-image-7.jpg" // A professional placeholder image
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
