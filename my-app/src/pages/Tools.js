
import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const tools = [
  {
    name: "Firebase",
    url: "https://firebase.google.com/",
    description: "A comprehensive platform for building web and mobile applications.",
  },
  {
    name: "React",
    url: "https://reactjs.org/",
    description: "A JavaScript library for building user interfaces.",
  },
  {
    name: "Material-UI",
    url: "https://mui.com/",
    description: "A popular React UI framework for faster and easier web development.",
  },
];

const Tools = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Tools & Resources
        </Typography>
        <ul>
          {tools.map((tool, index) => (
            <li key={index}>
              <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                <Typography variant="h6">{tool.name}</Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                {tool.description}
              </Typography>
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default Tools;
