import { configureStore } from '@reduxjs/toolkit';
import { uncontrolledFormReducer } from './Forms/Uncontrolled_form.slice';

export const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
