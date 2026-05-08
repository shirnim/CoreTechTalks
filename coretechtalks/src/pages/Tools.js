import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { API_BASE_URL, DISABLED_TOOLS } from '../config';

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tools`)
      .then(res => res.json())
      .then(data => {
        // Filter out any tools that are listed in the DISABLED_TOOLS config array
        const activeTools = (data || []).filter(tool => !DISABLED_TOOLS.includes(tool.slug));
        setTools(activeTools);
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
          Generic Utility Tools
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, textAlign: 'center', maxWidth: '600px', mx: 'auto' }}>
          Explore our collection of useful utilities and automated applications.
        </Typography>

        {loading ? (
          <Typography textAlign="center">Loading available tools...</Typography>
        ) : tools.length === 0 ? (
          <Typography variant="h5" textAlign="center" sx={{ mt: 4, color: 'text.secondary' }}>Tools will be coming soon.</Typography>
        ) : (
          <Grid container spacing={4}>
            {tools.map(tool => (
              <Grid item xs={12} md={4} key={tool.id}>
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
