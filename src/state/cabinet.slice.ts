import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cabinet, Switcher } from '../types';

const initialState: Cabinet = {};

export const cabinetSlice = createSlice({
  name: 'cabinet',
  initialState,
  reducers: {
    addSwitcher: (state, { payload: switcher }: PayloadAction<Switcher>) => {
      state[switcher.key] = switcher;
    },
  },
});

export const { addSwitcher } = cabinetSlice.actions;

export default cabinetSlice.reducer;
