import React from 'react';
import { Box, Typography, Container, Paper, Link } from '@mui/material';

const Contact = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="md" sx={{ maxWidth: '900px !important' }}>
        <Paper 
          sx={{ 
            p: { xs: 4, md: 8 }, 
            borderRadius: '16px', 
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '36px', md: '42px' }, 
              mb: 2 
            }}
          >
            Get in Touch
          </Typography>
          <Typography 
            variant="h2"
            sx={{ 
              color: 'text.secondary', 
              fontSize: { xs: '18px', md: '20px' }, 
              maxWidth: '600px', 
              mx: 'auto', 
              mb: 5
            }}
          >
            Have a project in mind or a question about our services? We’d love to hear from you.
          </Typography>
          <Box>
            <Link 
              href="mailto:coretechtalks@coretechtalks.com" 
              variant="h5" 
              sx={{ 
                color: 'primary.main', 
                textDecoration: 'none', 
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              coretechtalks@coretechtalks.com
            </Link>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 1.5,
              }}
            >
              We typically respond within 24–48 hours.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
