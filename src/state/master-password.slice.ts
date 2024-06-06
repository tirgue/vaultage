import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const masterPasswordSlice = createSlice({
  name: 'masterPassword',
  initialState: '',
  reducers: {
    setMasterPassword: (
      _,
      { payload: masterPassword }: PayloadAction<string>,
    ) => {
      return masterPassword;
    },
  },
  selectors: {
    selectMasterPassword: (state) => state,
  },
});

export const { setMasterPassword } = masterPasswordSlice.actions;
export const { selectMasterPassword } = masterPasswordSlice.selectors;

export default masterPasswordSlice.reducer;
