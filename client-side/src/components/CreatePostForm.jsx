import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel
} from '@mui/material';
import axios from 'axios';

export default function CreatePostForm({ userEmail }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [email , setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image || !email) {
      return alert('Please fill in all fields and select an image.');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('email', email); 

    try {
      const response = await axios.post('https://blog-platform-2-ts3e.onrender.com/posts', formData);
      alert('Post created!');
      console.log(response.data);
      
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error(error);
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ maxWidth: 500, margin: '0 auto', mt: 5 }}>
        <Typography variant="h5">Create New Post</Typography>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Content"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Stack direction="column" spacing={1}>
          <InputLabel>Choose an Image</InputLabel>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Stack>

        <Button type="submit" variant="contained" color="primary">
          Submit Post
        </Button>
      </Stack>
    </form>
  );
}
