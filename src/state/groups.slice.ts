import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Group, SliceState } from '../types';
import { getInitialState } from './get-initial-state';

const initialState: SliceState<Group> = getInitialState('group');

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup: (state, { payload: groupName }: PayloadAction<string>) => {
      state.byId[groupName] = {
        id: groupName,
        name: groupName,
      };
      state.allIds.push(groupName);
    },
    deleteGroup: (state, { payload: groupName }: PayloadAction<string>) => {
      delete state.byId[groupName];
      state.allIds = state.allIds.filter((id) => id !== groupName);
    },
  },
});

export const { addGroup, deleteGroup } = groupSlice.actions;

export default groupSlice.reducer;
