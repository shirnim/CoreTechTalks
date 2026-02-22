
import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body1">{blog.content}</Typography>
      </Container>
    </Box>
  );
};

export default BlogDetail;
