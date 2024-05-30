import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cabinet, Switcher } from '../types';

const initialState: Cabinet = JSON.parse(localStorage.getItem('root') ?? '{}');

export const cabinetSlice = createSlice({
  name: 'cabinet',
  initialState,
  reducers: {
    addSwitcher: (state, { payload: switcher }: PayloadAction<Switcher>) => {
      state[switcher.key] = switcher;
    },
    deleteSwitcher: (state, { payload: key }: PayloadAction<string>) => {
      delete state[key];
    },
  },
});

export const { addSwitcher, deleteSwitcher } = cabinetSlice.actions;

export default cabinetSlice.reducer;
