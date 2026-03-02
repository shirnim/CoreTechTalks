import React from 'react';
import { Box, Typography, Container, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF', // White background
        p: { xs: 4, md: 6 },
        mt: 'auto',
        borderTop: '1px solid #E2E8F0', // Slate 200
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} CoreTechTalks. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <IconButton component={Link} href="https://www.facebook.com/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <Facebook />
            </IconButton>
            <IconButton component={Link} href="https://www.twitter.com/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <Twitter />
            </IconButton>
            <IconButton component={Link} href="https://www.linkedin.com/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
