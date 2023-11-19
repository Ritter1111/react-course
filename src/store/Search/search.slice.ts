import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    saveSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { saveSearchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
