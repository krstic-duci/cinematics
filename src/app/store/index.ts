import { configureStore } from "@reduxjs/toolkit";

import watchLaterReducer from "./watchLater/watchLaterSlice";

export const store = configureStore({
  reducer: { watchLater: watchLaterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
