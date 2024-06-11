import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../redux/pexelsSlice';
import PhotoGallery from './PhotoGallery';

const Main = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.photos);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <PhotoGallery photos={items} loading={status === 'loading'} error={status === 'failed' ? error : null} />
  );
};

export default Main;
