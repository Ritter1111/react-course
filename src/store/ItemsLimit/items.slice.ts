import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  itemLimit: number;
}

const initialState: SearchState = {
  itemLimit: 10,
};

export const ItemsSlice = createSlice({
  name: "limit",
  initialState: initialState,
  reducers: {
    saveLimitItem: (state, action: PayloadAction<number>) => {
      state.itemLimit = action.payload;
    },
  },
});

export const { saveLimitItem } = ItemsSlice.actions;
export const limitReducer = ItemsSlice.reducer;
