
import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Grid } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Contact = () => {
  return (
    <Box className="page-shell" sx={{ flexGrow: 1, py: 8, backgroundColor: 'transparent' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" paragraph>
              We'd love to hear from you! Whether you have a question about our services, a potential project, or just want to say hello, feel free to reach out.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 2 }} />
              <Typography variant="body1">contact@coretechtalks.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 2 }} />
              <Typography variant="body1">+1 (555) 123-4567</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 2 }} />
              <Typography variant="body1">123 Tech Street, Silicon Valley, CA</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, md: 4 } }}>
              <form noValidate autoComplete="off">
                <TextField fullWidth label="Name" margin="normal" />
                <TextField fullWidth label="Email" margin="normal" />
                <TextField fullWidth label="Message" margin="normal" multiline rows={4} />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
