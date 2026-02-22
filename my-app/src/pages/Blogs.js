
import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      setBlogs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchBlogs();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Blogs
        </Typography>
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} md={6} key={blog.id}>
              <CardActionArea component={Link} to={`/blogs/${blog.id}`}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blogs;
