import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../../types/types';

interface IUncontrolledFormList {
  list: IFormData[];
}

const initialState: IUncontrolledFormList = {
  list: [],
  // name: '',
  // age: '',
  // email: '',
  // password: '',
  // password2: '',
  // // country: '',
  // gender: '',
  // acceptTerm: false,
  // picture: '',
};

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolled_form',
  initialState: initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<IFormData>) => {
      state.list.push(action.payload);
    },
  },
});

export const { saveFormData } = uncontrolledFormSlice.actions;
export const uncontrolledFormReducer = uncontrolledFormSlice.reducer;
