import React from 'react';
import { Box, Typography, Container, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

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
                <Link href={link.path} color="text.secondary" display="block" sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}>
                  {link.title}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} CoreTechTalks. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <IconButton component={Link} href="https://www.facebook.com/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <Facebook />
            </IconButton>
            <IconButton component={Link} href="https://www.twitter.com/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <Twitter />
            </IconButton>
            <IconButton component={Link} href="https://www.linkedin.com/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
