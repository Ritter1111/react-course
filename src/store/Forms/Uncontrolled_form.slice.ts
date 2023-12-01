import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUncontrolledFormList {
  list: IUncontrolledFormState[];
}

interface IUncontrolledFormState {
  name: string;
  age: string;
  email: string;
  password: string;
  password2: string;
  // country: string,
  gender: string;
  acceptTerm: boolean;
  picture: string;
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
    saveFormData: (state, action: PayloadAction<IUncontrolledFormState>) => {
      state.list.push(action.payload);
    },
  },
});

export const { saveFormData } = uncontrolledFormSlice.actions;
export const uncontrolledFormReducer = uncontrolledFormSlice.reducer;
