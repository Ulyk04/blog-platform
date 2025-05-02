import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import CreatePostForm from './CreatePostForm'; 
import {useNavigate} from 'react-router-dom'






export default function PostButton({ userEmail }) {

  const handleLogOut = () => {
   
    alert('You log out from you account')
    navigate('/')
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userEmail');
  }

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<LocalPostOfficeIcon />}
          size="large"
          onClick={handleOpenDialog}
        >
          Create a post
        </Button>
        <Button
          variant="contained"
          endIcon={<LogoutIcon />}
          size="large"
          onClick={() => handleLogOut()}
        >
          Log out
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <CreatePostForm userEmail={userEmail} />
        </DialogContent>
      </Dialog>
    </>
  );
}
