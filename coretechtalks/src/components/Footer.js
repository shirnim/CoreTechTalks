import React from 'react';
import { Box, Typography, Container, Link, Grid } from '@mui/material';

const Footer = () => {
  const sections = {
    'Categories': [
      { title: 'Web Development', path: '/blogs/web-dev' },
      { title: 'Cloud Computing', path: '/blogs/cloud' },
      { title: 'UI/UX Design', path: '/blogs/design' },
      { title: 'AI & Machine Learning', path: '/blogs/ai-ml' },
    ],
    'Site Links': [
      { title: 'Tools', path: '/tools' },
      { title: 'Services', path: '/services' },
      { title: 'About Us', path: '/about' },
      { title: 'Contact', path: '/contact' },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF', // White background
        p: { xs: 4, md: 8 },
        mt: 'auto',
        borderTop: '1px solid #E2E8F0', // Soft border
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>CoreTechTalks</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '300px' }}>
              Your essential source for expert analysis, practical tools, and in-depth guides on modern technology.
            </Typography>
          </Grid>
          {Object.keys(sections).map((sectionTitle) => (
            <Grid item xs={6} sm={3} md={2} key={sectionTitle}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>{sectionTitle}</Typography>
              {sections[sectionTitle].map((link) => (
                <Link key={link.title} href={link.path} color="text.secondary" display="block" sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}>
                  {link.title}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} CoreTechTalks. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
