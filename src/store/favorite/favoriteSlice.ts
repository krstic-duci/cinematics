import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addWatchLater: (state, action: PayloadAction) => {
      console.log("Added new item");
    },
    removeItemWatchLater: (state, action: PayloadAction) => {
      console.log("Remove favorite item");
    },
  },
});

export const { addWatchLater, removeItemWatchLater } = favoriteSlice.actions;

export default favoriteSlice.reducer;
