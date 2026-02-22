
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          CoreTechTalks
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" paragraph>
          Your ultimate destination for tech insights, tutorials, and resources.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Explore Blogs
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
