// src/redux/favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

// Async thunk to save favorite
export const saveFavorite = createAsyncThunk(
  'favorites/saveFavorite',
  async ({ userId, photo }, { rejectWithValue }) => {
    try {
      const favoritesRef = collection(db, 'favorites');
      const favoriteDoc = await addDoc(favoritesRef, { userId, ...photo });
      return { id: favoriteDoc.id, ...photo, liked: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch favorites
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const favorites = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return favorites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const photo = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === photo.id);

      if (existingIndex >= 0) {
        // Remove the photo from favorites
        state.items.splice(existingIndex, 1);
      } else {
        // Add the photo to favorites
        state.items.push({ ...photo, liked: true });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(saveFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
