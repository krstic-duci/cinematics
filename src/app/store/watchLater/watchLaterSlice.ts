import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Movie, MoviesItems } from "pages/Movies/Movies.types";
import { RootState } from "../";

const initialState: MoviesItems = {
  results: [],
};

const watchLater = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    addWatchLater: (state, action: PayloadAction<Movie>) => {
      state.results.push(action.payload);
    },
    removeWatchLaterItem: (state, action: PayloadAction<number>) => {
      state.results = state.results.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addWatchLater, removeWatchLaterItem } = watchLater.actions;

export const selectWatchLaterMovies = (state: RootState) =>
  state.watchLater.results;

export default watchLater.reducer;
