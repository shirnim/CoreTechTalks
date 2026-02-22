
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          CoreTechTalks is a leading platform for tech enthusiasts, developers,
          and learners. Our mission is to provide high-quality content that
          empowers our audience to stay ahead in the ever-evolving world of
          technology.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1" paragraph>
          We are a team of passionate technologists, writers, and educators
          dedicated to creating valuable content for our community. Our diverse
          backgrounds and expertise allow us to cover a wide range of topics in
          depth.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
