import { configureStore } from "@reduxjs/toolkit";
import { animeApi } from "./api/api";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      [animeApi.reducerPath]: animeApi.reducer,
    },
    middleware: (getDefaultMiddlware) =>
      getDefaultMiddlware().concat(animeApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
