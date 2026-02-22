
import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { Code, Web, Storage } from "@mui/icons-material";

const services = [
  {
    title: "Web Development",
    description: "Building modern, responsive, and scalable web applications.",
    icon: <Web />,
  },
  {
    title: "Backend Development",
    description: "Developing robust and efficient server-side solutions.",
    icon: <Code />,
  },
  {
    title: "Database Management",
    description: "Managing and optimizing databases for performance and reliability.",
    icon: <Storage />,
  },
];

const Services = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  {service.icon}
                  <Typography variant="h5" component="h2" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
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
