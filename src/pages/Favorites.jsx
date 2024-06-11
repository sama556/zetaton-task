import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../redux/favoritesSlice';
import PhotoGallery from '../components/PhotoGallery';
import { Typography } from '@mui/material';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <Typography variant='h4' sx={{ textAlign: 'center', margin: "15px" }}>
        Favorite <span style={{ color: '#762fcf', transform: 'initial' }}>Photos</span>
      </Typography>
      <PhotoGallery photos={favorites} />
    </>
  );
};

export default FavoritesPage;
