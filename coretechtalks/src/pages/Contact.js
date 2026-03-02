import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Link } from '@mui/material';

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
              mb: 4 
            }}
          >
            Have a project in mind or a question about our services? We’d love to hear from you.
          </Typography>
          <Box sx={{ my: 4 }}>
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
          </Box>
          <form noValidate autoComplete="off" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <TextField fullWidth label="Name" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Message" margin="normal" multiline rows={4} />
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2, py: 1.5 }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
