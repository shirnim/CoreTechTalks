
import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        p: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} CoreTechTalks. All rights reserved.
      </Typography>
      <Link href="#" sx={{ mx: 1 }}>
        Facebook
      </Link>
      <Link href="#" sx={{ mx: 1 }}>
        Twitter
      </Link>
      <Link href="#" sx={{ mx: 1 }}>
        LinkedIn
      </Link>
    </Box>
  );
};

export default Footer;
