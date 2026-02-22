
import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Contact Us
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Name"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
