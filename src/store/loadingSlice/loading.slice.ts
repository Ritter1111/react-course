import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  mainLoading: boolean;
  detailsLoading: boolean;
}

const initialState: LoadingState = {
  mainLoading: false,
  detailsLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setMainPageLoading: (state, action: PayloadAction<boolean>) => {
      state.mainLoading = action.payload;
    },
    setDetailsPageLoading: (state, action) => {
      state.detailsLoading = action.payload;
    },
  },
});

export const { setMainPageLoading, setDetailsPageLoading } =
  loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
