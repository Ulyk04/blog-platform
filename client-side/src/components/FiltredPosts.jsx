import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { PostCliend } from './ProfileCard'; 

export default function FilredPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      const postsData = response.data;

      
      const formattedPosts = postsData.map((post) => ({
        ...post,
        image: post.image ? `http://localhost:5000${post.image}` : '',
      }));

      const mail = localStorage.getItem('userEmail');

      const filtredPosts = formattedPosts.filter(post => post.email === mail)

      setPosts(filtredPosts.reverse());
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

 

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Main page
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : posts.length === 0 ? (
        <Typography variant="h6">There are no posts yet.</Typography>
      ) : (
        <Grid container spacing={4} direction="column">
          {posts.map((post) => (
            <Grid item key={post.id}>
              <PostCliend
                image={post.image}
                title={post.title}
                description={post.content}
                ownerEmail={post.email}
                postId={post.id}
                onDelete={fetchPosts}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
