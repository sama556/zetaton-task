
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../redux/pexelsSlice';
import PhotoGallery from '../components/PhotoGallery';
import { Typography, colors } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.photos);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <>
    <Typography variant='h4' sx={{ textAlign: 'center', margin: "15px" }}>
  Fetch <span style={{ color: '#762fcf'  ,transform:'initial'}}>Photos</span> From the Pexels API
</Typography>

      <PhotoGallery
        photos={items}
        loading={status === 'loading'}
        error={status === 'failed' ? error : null}
      />
    </>
  );
};

export default Home;
