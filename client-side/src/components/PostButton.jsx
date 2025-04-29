import * as React from 'react';
import Button from '@mui/material/Button';
import LocalPostOffice from '@mui/icons-material/LocalPostOffice'
import Logout from '@mui/icons-material/Logout'
import Stack from '@mui/material/Stack';

export default function IconLabelButtons() {
  return (
    <Stack direction="row" spacing={5} sx={{display: 'flex' , justifyContent: 'center'}} >
      <Button variant="outlined" startIcon={<LocalPostOffice />} size='large' >
        Create a post
      </Button>
      <Button variant="contained" endIcon={<Logout />} size='large' >
        Log out
      </Button>
    </Stack>
  );
}
