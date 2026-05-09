import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { API_BASE_URL, DISABLED_TOOLS } from '../config';

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tools`)
      .then(res => res.json())
      .then(data => {
        const activeTools = (data || []).filter(tool => !DISABLED_TOOLS.includes(tool.slug));

        const dummyTools = [
          { id: 'dummy-1', name: 'Data Visualizer Pro', description: 'Quickly create beautiful interactive charts and graphs from your raw CSV or Excel files.', slug: 'data-visualizer', isDummy: true },
          { id: 'dummy-2', name: 'SEO Content Analyzer', description: 'Analyze your web pages for SEO best practices, keyword density, and meta tag optimization.', slug: 'seo-analyzer', isDummy: true },
          { id: 'dummy-3', name: 'Smart JSON Formatter', description: 'Format, validate, and beautify your complex JSON data with advanced syntax highlighting.', slug: 'json-formatter', isDummy: true }
        ];

        const activeSlugs = new Set(activeTools.map(t => t.slug));
        const filteredDummies = dummyTools.filter(d => !activeSlugs.has(d.slug));

        setTools([...activeTools, ...filteredDummies]);
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
          <Typography variant="h5" textAlign="center" sx={{ mt: 4, color: 'text.secondary' }}>
            Tools will be coming soon.
          </Typography>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '32px',
            }}
          >
            {tools.map(tool => (
              <Card
                key={tool.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '280px',
                  borderRadius: '8px',
                }}
                sx={{ boxShadow: 3 }}
              >
                <CardContent
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '24px',
                  }}
                >
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    {tool.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {tool.description}
                  </Typography>
                </CardContent>
                <CardActions style={{ padding: '16px', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={tool.isDummy}
                    component={tool.isDummy ? 'button' : Link}
                    to={tool.isDummy ? undefined : `/tools/${tool.slug}`}
                  >
                    Launch Application
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
};

export default Tools;