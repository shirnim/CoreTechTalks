
import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, CardActions, Paper } from '@mui/material';
import { Build, Code, DesignServices } from '@mui/icons-material';

const tools = [
  {
    icon: <Build fontSize="large" color="primary" />,
    title: 'Tool 1',
    description: 'A brief description of the first amazing tool.',
    link: '#',
  },
  {
    icon: <Code fontSize="large" color="primary" />,
    title: 'Tool 2',
    description: 'A brief description of the second amazing tool.',
    link: '#',
  },
  {
    icon: <DesignServices fontSize="large" color="primary" />,
    title: 'Tool 3',
    description: 'A brief description of the third amazing tool.',
    link: '#',
  },
];

const Tools = () => {
  return (
    <Box className="page-shell" sx={{ flexGrow: 1, py: 8, backgroundColor: 'transparent' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Our Tools
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Box sx={{ mb: 2 }}>{tool.icon}</Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {tool.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{tool.description}</Typography>
                <Button variant="outlined" href={tool.link} target="_blank">
                  Learn More
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tools;
