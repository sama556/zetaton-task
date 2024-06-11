import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../redux/pexelsSlice';
import { toggleFavorite } from '../redux/favoritesSlice';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Avatar, Pagination } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loading from './Loading';


const PhotoGallery = ({ photos, onFavoriteClick }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const currentPage = useSelector((state) => state.photos.currentPage);
  const status = useSelector((state) => state.photos.status);
  const userId = useSelector((state) => state.auth.user?.uid);

  useEffect(() => {
    dispatch(fetchPhotos(currentPage));
  }, [currentPage, dispatch]);

  const handleFavoriteClick = (photo) => {
    dispatch(toggleFavorite(photo));
    if (onFavoriteClick) {
      onFavoriteClick(photo);
    }
    if (userId) {
      dispatch(saveFavorite({ userId, photo }));
    }
  };

  const isPhotoFavorite = (photo) => {
    return favorites.some(item => item.id === photo.id && item.liked);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(fetchPhotos(newPage));
  };

  return (
    <>
      {status === 'loading' ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={2}>
            {photos.map((photo) => (
              <Grid item xs={12} sm={6} md={4} key={photo.id}>
                <Card sx={{ maxWidth: 350, height: 380 ,margin:3}}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: '#762fcf' }} aria-label="photo">
                        {photo.photographer[0]}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={photo.photographer}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={photo.src.original || 'fallback-image-url.jpg'}
                    alt={photo.alt || 'Image not available'}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {photo.alt}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => handleFavoriteClick(photo)}
                      sx={{ color: isPhotoFavorite(photo) ? red[500] : 'default' }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={10} 
            page={currentPage}
            onChange={handleChangePage}
           
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2  }}
          />
        </>
      )}
    </>
  );
};

export default PhotoGallery;
