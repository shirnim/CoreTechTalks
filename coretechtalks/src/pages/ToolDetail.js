import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Button, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { API_BASE_URL } from '../config';

const ToolDetail = () => {
  const { slug } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tools/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Tool not found");
        return res.json();
      })
      .then(data => {
        setTool(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tool:", err);
        setLoading(false);
      });
  }, [slug]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool_slug: slug })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Error connecting to Stripe");
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("Checkout failed:", e);
      alert(`Checkout Error: ${e.message}\n(Make sure your Stripe Secret Keys are properly set in the backend .env file!)`);
      setCheckoutLoading(false);
    }
  };

  if (loading) return <Box py={8} textAlign="center"><Typography>Loading details...</Typography></Box>;
  if (!tool) return <Box py={8} textAlign="center"><Typography>Tool not found.</Typography></Box>;

  const features = tool.features ? tool.features.split(',') : [];

  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 4, md: 6 }, borderRadius: '16px', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.1)' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
            {tool.name}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>
            ${tool.price.toFixed(2)}
          </Typography>
          
          <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary', mb: 4 }}>
            {tool.description}
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            What's Included:
          </Typography>
          <List sx={{ mb: 4 }}>
            {features.map((feature, idx) => (
              <ListItem key={idx} disableGutters>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={feature.trim()} primaryTypographyProps={{ fontSize: '1.1rem' }} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={handleCheckout}
              disabled={checkoutLoading}
              sx={{ px: 6, py: 2, fontSize: '1.2rem', borderRadius: 2 }}
            >
              {checkoutLoading ? 'Preparing Checkout...' : 'Purchase'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ToolDetail;
