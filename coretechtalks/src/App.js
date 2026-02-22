
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
