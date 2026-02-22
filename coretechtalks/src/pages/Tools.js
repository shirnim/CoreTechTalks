
import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, CardActions } from '@mui/material';

const tools = [
  {
    title: 'Tool 1',
    description: 'A brief description of the first amazing tool.',
    link: '#',
  },
  {
    title: 'Tool 2',
    description: 'A brief description of the second amazing tool.',
    link: '#',
  },
  {
    title: 'Tool 3',
    description: 'A brief description of the third amazing tool.',
    link: '#',
  },
];

const Tools = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Our Tools
        </Typography>
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {tool.title}
                  </Typography>
                  <Typography variant="body2">{tool.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={tool.link} target="_blank">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tools;
