import React from 'react';
import { Box, Typography, Container, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { RocketLaunch as RocketLaunchIcon } from '@mui/icons-material';

const Tools = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Paper 
          sx={{ 
            p: { xs: 4, md: 8 }, 
            borderRadius: '16px', 
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1)'
          }}
        >
          <RocketLaunchIcon sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '36px', md: '44px' }, 
              mb: 2 
            }}
          >
            Tech Tools Are Coming Soon
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
            We’re building powerful tools to help you analyze, optimize, and stay ahead in tech. Stay tuned.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={Link}
              to="/contact"
            >
              Notify Me When Tools Launch
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              component={Link}
              to="/blogs"
            >
              Explore Our Blog
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Tools;
