import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataObject, Language, AutoAwesome, CheckCircleOutline } from '@mui/icons-material';

const services = [
  {
    icon: <DataObject sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Python Automation',
    description: 'We design and implement automation systems that eliminate repetitive tasks, streamline operations, and improve efficiency. From data scraping and reporting automation to backend workflows and integrations, we build scalable Python solutions tailored to your needs.',
    points: [
      'Workflow automation',
      'Data scraping & processing',
      'API integrations',
      'Reporting & analytics automation',
    ],
  },
  {
    icon: <Language sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Web Development',
    description: 'We build modern, responsive, and high-performance web applications using scalable architectures and clean design principles. Our solutions focus on performance, usability, and long-term maintainability.',
    points: [
      'Full-stack web applications',
      'SaaS platforms',
      'Custom dashboards',
      'Performance optimization',
    ],
  },
  {
    icon: <AutoAwesome sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Machine Learning Solutions',
    description: 'We develop intelligent systems that turn data into actionable insights. From predictive models to automation powered by AI, we help businesses make data-driven decisions with confidence.',
    points: [
      'Predictive modeling',
      'NLP & text analysis',
      'Data-driven automation',
      'Model deployment & integration',
    ],
  },
];

const Services = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="lg" sx={{ maxWidth: '1100px !important' }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ fontWeight: 700, fontSize: { xs: '38px', md: '44px' }, mb: 2 }}
          >
            Technology Solutions Built for Scale
          </Typography>
          <Typography 
            variant="h2"
            sx={{ 
              color: 'text.secondary', 
              fontSize: { xs: '18px', md: '20px' }, 
              maxWidth: '750px', 
              mx: 'auto', 
              mb: 4 
            }}
          >
            We help businesses automate workflows, build high-performance web applications, and leverage machine learning for smarter decision-making.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={Link}
            to="/contact"
          >
            Request a Consultation
          </Button>
        </Box>

        {/* Services Section */}
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{
                p: 3,
                height: '100%',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {service.icon}
                    <Typography variant="h2" component="h2" sx={{ fontSize: '26px', fontWeight: 600, my: 2 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, minHeight: '120px' }}>
                      {service.description}
                    </Typography>
                  </Box>
                  <List dense>
                    {service.points.map((point, i) => (
                      <ListItem key={i} sx={{ p: 0 }}>
                        <ListItemIcon sx={{ minWidth: '32px'}}><CheckCircleOutline fontSize="small" color="primary" /></ListItemIcon>
                        <ListItemText primary={point} primaryTypographyProps={{ fontSize: '16px' }} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
