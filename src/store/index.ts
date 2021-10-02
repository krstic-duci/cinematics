import { configureStore } from "@reduxjs/toolkit";

import favoriteSlice from "./favorite/favoriteSlice";

export const store = configureStore({
  reducer: { favorite: favoriteSlice },
});

export type RootState = ReturnType<typeof store.getState>;
