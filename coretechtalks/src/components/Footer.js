
import React from 'react';
import { Box, Typography, Container, Link, Grid } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        p: 6,
        mt: 'auto',
        borderTop: '1px solid #e0e0e0',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              CoreTechTalks
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your go-to resource for the latest in tech. We cover everything from software development to AI and beyond.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block">Home</Link>
            <Link href="/about" color="inherit" display="block">About</Link>
            <Link href="/services" color="inherit" display="block">Services</Link>
            <Link href="/blogs" color="inherit" display="block">Blogs</Link>
            <Link href="/tools" color="inherit" display="block">Tools</Link>
            <Link href="/contact" color="inherit" display="block">Contact</Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit" sx={{ mr: 2 }}><Facebook /></Link>
            <Link href="https://www.twitter.com/" color="inherit" sx={{ mr: 2 }}><Twitter /></Link>
            <Link href="https://www.linkedin.com/" color="inherit"><LinkedIn /></Link>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} CoreTechTalks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
