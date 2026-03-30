import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/tools')
      .then(res => res.json())
      .then(data => {
        setTools(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tools:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
          Interactive Tools
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, textAlign: 'center', maxWidth: '600px', mx: 'auto' }}>
          Explore our suite of live dashboards and automated data workflows.
        </Typography>

        {loading ? (
          <Typography textAlign="center">Loading available tools...</Typography>
        ) : tools.length === 0 ? (
          <Typography textAlign="center">No tools available yet. Setup backend seeder.</Typography>
        ) : (
          <Grid container spacing={4}>
            {tools.map(tool => (
              <Grid item xs={12} md={6} key={tool.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                      {tool.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {tool.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      component={Link} 
                      to={`/tools/${tool.slug}`}
                    >
                      Launch Application
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Tools;
