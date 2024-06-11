import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'l8xZcxMTsD1hOYeWsm2yEW21jbZHGd9uuS5bTKzGAPJ5gfa8tOC8NlJw'; 
const BASE_URL = 'https://api.pexels.com/v1/curated';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (page = 1) => {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        page,
        per_page: 9,
      },
    });
    return { photos: response.data.photos, page };
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.photos;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default photosSlice.reducer;
