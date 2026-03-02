
import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import { Code, Web, Storage, Security } from '@mui/icons-material';

const services = [
  {
    icon: <Code fontSize="large" color="primary" />,
    title: 'Web Development',
    description: 'We build modern, responsive, and high-performance web applications tailored to your business needs.',
  },
  {
    icon: <Web fontSize="large" color="primary" />,
    title: 'API Development',
    description: 'We design and build robust and scalable RESTful APIs to power your mobile and web applications.',
  },
  {
    icon: <Storage fontSize="large" color="primary" />,
    title: 'Database Management',
    description: 'We provide expert database management services to ensure your data is secure, organized, and easily accessible.',
  },
  {
    icon: <Security fontSize="large" color="primary" />,
    title: 'Cybersecurity Consulting',
    description: 'We help you identify and mitigate security vulnerabilities to protect your applications and data from threats.',
  },
];

const Services = () => {
  return (
    <Box className="page-shell" sx={{ flexGrow: 1, py: 8, backgroundColor: 'transparent' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">{service.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
