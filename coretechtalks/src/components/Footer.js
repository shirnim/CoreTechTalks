
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        p: 6,
        mt: 'auto',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} CoreTechTalks. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="https://www.facebook.com/">
            Facebook
          </Link>{' | '}
          <Link color="inherit" href="https://www.twitter.com/">
            Twitter
          </Link>{' | '}
          <Link color="inherit" href="https://www.linkedin.com/">
            LinkedIn
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
