import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPageLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
