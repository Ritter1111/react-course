import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../../types/types';

interface IUncontrolledFormList {
  list: IFormData[];
}

const initialState: IUncontrolledFormList = {
  list: [],
};

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolled_form',
  initialState: initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<IFormData>) => {
      state.list.forEach((item) => {
        item.newData = false;
      });

      state.list.push(action.payload);
    },
  },
});

export const { saveFormData } = uncontrolledFormSlice.actions;
export const uncontrolledFormReducer = uncontrolledFormSlice.reducer;
