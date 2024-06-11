import { configureStore } from '@reduxjs/toolkit';
import pexelsReducer from './pexelsSlice';
import favoritesReducer from './favoritesSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    photos: pexelsReducer,
    favorites: favoritesReducer,
     auth: authReducer
  }
});

export default store;
