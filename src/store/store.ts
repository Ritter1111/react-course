import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './Search/search.slice';
import { limitReducer } from './ItemsLimit/items.slice';
import { animeApi } from './api/api';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    limit: limitReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
