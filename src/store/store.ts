import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./Search/search.slice";
import { limitReducer } from "./ItemsLimit/items.slice";
import { animeApi } from "./api/api";
import { loadingReducer } from "./loadingSlice/loading.slice";
import { createWrapper } from "next-redux-wrapper";

export const store = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      limit: limitReducer,
      loading: loadingReducer,
      [animeApi.reducerPath]: animeApi.reducer,
    },
    middleware: (getDefaultMiddlware) =>
      getDefaultMiddlware().concat(animeApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
