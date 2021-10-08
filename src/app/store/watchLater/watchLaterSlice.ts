import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../index";

import type { Movie, MoviesItems } from "pages/Movies/Movies.types";

const initialState: MoviesItems = {
  results: [],
};

const watchLater = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    addWatchLater: (state, action: PayloadAction<Movie>) => {
      // Since TMDB doesn't have isFavorite in response,
      // we are adding a default one because if you first
      // click on "Later" then "Add to Favorite" it would break
      // because state object cannot be extended
      state.results.push({ ...action.payload, isFavorite: false });
    },
    removeWatchLaterItem: (state, action: PayloadAction<number>) => {
      state.results = state.results.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addWatchLater, removeWatchLaterItem } = watchLater.actions;

export const selectWatchLaterMovies = (state: RootState) => state.watchLater.results;

export default watchLater.reducer;
