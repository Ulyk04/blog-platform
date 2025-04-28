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
import Profile from '../images/men.jpg';
import Live from '../images/live-from-space.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from  '@mui/icons-material/Share';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 1050 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={Profile}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          John Backus
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam molestiae saepe nesciunt dolore? Quod deleniti itaque culpa odit placeat ut atque aliquid eos dolorem quam delectus repudiandae error, deserunt quibusdam!
        </Typography>
      </CardContent>
    </Card>
    
  );
}

export function MediaControlCard() {
    const theme = useTheme();
  
    return (
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto'  , marginLeft: 10}}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Mac Miller
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 , marginLeft: 10 }}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 , marginLeft: 70 }}
          image={Live}
          alt="Live from space album cover"
        />
      </Card>
    );
  }

export function PostCliend({image , title , description}) {
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
                <IconButton aria-label='Liked' >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label='share' >
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}