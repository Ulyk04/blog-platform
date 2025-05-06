import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Box, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Profile from '../images/profile.jpg';
import Live from '../images/live-from-space.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from  '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import PauseIcon from '@mui/icons-material/PauseCircle'



export default function MediaCard() {

  const [description , setDescription] = React.useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam molestiae saepe nesciunt dolore? Quod deleniti itaque culpa odit placeat ut atque aliquid eos dolorem quam delectus repudiandae error, deserunt quibusdam!')
  const [open , setOpen] = React.useState(false)
  const [email , setEmail] = React.useState('');
  const [profileImage , setProfileImage] = React.useState(Profile);

  const inputRef = React.useRef(null);
  const handleOpen =() => setOpen(true);
  const handleClose =() => setOpen(false);

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail')
    if(savedEmail){
      setEmail(savedEmail);
    }

    const saveImage = localStorage.getItem(`profilImage_${savedEmail}`);
    if(saveImage){
      setProfileImage(saveImage);
    }

    const saveDesc = localStorage.getItem(`profilDesc_${savedEmail}`);
    if(saveDesc){
      setDescription(saveDesc);
    }
  } , []);

  const gmail = localStorage.getItem('userEmail')

  const handleSave = () => {
    localStorage.setItem(`profilDesc_${gmail}` , description);
    setOpen(false);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      const reader = new FileReader();

      reader.onloadend=() => {
        setProfileImage(reader.result);
        localStorage.setItem(`profilImage_${gmail}` , reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Card sx={{ maxWidth: 1050 }}>

      <CardMedia
        sx={{ height: 500 , cursor: 'pointer' }}
        image={profileImage}
        title="Profile"
        onClick = {() => inputRef.current?.click()}
      />
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        style={{display: 'none'}}
        onChange={handleImageChange}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {email ? email : 'Your email '}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }} onClick={handleOpen}>
            {description}
        </Typography>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chandge a description</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
    
  );
}
export function MediaControlCard({ email }) {
  const [searchInput, setSearchInput] = React.useState('');
  const [song, setSong] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (!email) return;
    const fetchSavedSong = async () => {
      const response = await fetch(`http://localhost:5000/get-song?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setSong(data.song); // теперь отобразим эту песню ниже
      }
    };
    fetchSavedSong();
  }, [email]);

  const handleSearch = async () => {
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchInput)}&entity=song&limit=1`);
    const data = await response.json();
    if (data.results.length > 0) {
      const result = data.results[0];
      const selectedSong = {
        title: result.trackName,
        artist: result.artistName,
        src: result.previewUrl,
        cover: result.artworkUrl100.replace('100x100bb.jpg', '300x300bb.jpg'),
      };
      setSong(selectedSong);

      await fetch('http://localhost:5000/set-song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, song: selectedSong }),
      });
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectSong = async () => {
    if (!song) return;
    await fetch('http://localhost:5000/set-song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, song }),
    });
    alert('Music is saved in your profile');
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Box sx={{ flex: 1 }}>
        <TextField
          label="Search song"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          fullWidth
        />

        {song && (
          <>
            <CardContent>
              <Typography variant="h5">{song.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">{song.artist}</Typography>
            </CardContent>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <IconButton onClick={handlePlayPause}>
                {isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
              </IconButton>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSelectSong}
                sx={{ mt: 1, ml: 2 }}
              >
                Select this music 
              </Button>
            </Box>

            <audio ref={audioRef} src={song.src} onEnded={() => setIsPlaying(false)} />
          </>
        )}
      </Box>

      {song && (
        <CardMedia
          component="img"
          sx={{ width: 151, ml: 2 }}
          image={song.cover}
          alt="Album cover"
        />
      )}
    </Card>
  );
}


export function PostCliend({image , title , description , ownerEmail , postId , onDelete}) {

  const [likes , setLikes] = React.useState(0);
  const [share , setShare] = React.useState(false);
  const currentUserEmail = localStorage.getItem('userEmail');

  const storageKey = `likes_${title.replace(/\s+/g, '_').toLowerCase()}`
  const postUrl = `http://yourblog.com/posts/${title.replace(/\s+/g, '-').toLowerCase()}`

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure to delete this post?');
    if(!confirm) return;

    try{
      console.log('Deleting the post' , postId)
      await axios.delete(`http://localhost:5000/posts/${postId}`, {
        data: { email: ownerEmail } 
      });
      alert('Post deleted successfully');
      onDelete();
    } catch(err){
      alert('Error deleting post');
      console.error(err);
    }
  };

  React.useEffect(() => {
    const savedLikes = localStorage.getItem(storageKey);
    if(savedLikes){
      setLikes(parseInt(savedLikes , 10));
    }
  } , [storageKey]);

  const handleLike =() => {
    const newLike = likes + 1
    setLikes(newLike);
    localStorage.setItem(storageKey , newLike.toString());
  }

  const handleShareOpen =() => {
    setShare(true);
  }

  const handleShareClose=() => {
    setShare(false);
  }

  const handleCopyLink = async() => {
    try{
      await navigator.clipboard.writeText(postUrl);
      alert('URL was copy')
    }catch(err){
      alert(`We can't copy you'r URL`)
    }
  };

    return(

        <Card sx={{minWidth: 1050}} >
            <CardMedia
                sx={{height: 500}}
                image={image}
            />
            <CardContent>
                <Typography gutterBottom variant='h3' component='div' >
                    {title}
                </Typography>
                <Typography variant='h6' sx={{color: 'text.primary'}} >
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title = 'Liked'>
                  <IconButton aria-label='Liked' onClick={handleLike} >
                      <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant='body1'>{likes}</Typography>
                
                <Tooltip title='Share'>
                  <IconButton aria-label='share' onClick={handleShareOpen} >
                      <ShareIcon />
                  </IconButton>
                </Tooltip>


                <Tooltip title="Delete">
                  <IconButton onClick={handleDelete} >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>


            </CardActions>
            <Dialog open={share} onClose={handleShareClose}>
              <DialogTitle>Share</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  value={postUrl}
                  InputProps={{ readOnly: true }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleShareClose}>Close</Button>
                <Button onClick={handleCopyLink}>Copy the URL</Button>
              </DialogActions>
            </Dialog>
        </Card>
    )
}
