import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

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
            <Box
              sx={{
                width: '100%',
                maxWidth: '450px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern technology"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
