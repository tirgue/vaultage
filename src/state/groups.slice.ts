import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Group, SliceState } from '../types';
import { selectAllIds, selectById } from './common-selector';
import { getInitialState } from './get-initial-state';

const initialState: SliceState<Group> = getInitialState('group');

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupState: (_, { payload }: PayloadAction<SliceState<Group>>) =>
      payload,
    addGroup: (state, { payload: groupName }: PayloadAction<string>) => {
      if (state.byId[groupName]) return;

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
  selectors: {
    selectAllGroups: createSelector(
      selectById<Group>,
      selectAllIds<Group>,
      (byId, allIds) => allIds.map((id) => byId[id]),
    ),
  },
});

export const { addGroup, deleteGroup, setGroupState } = groupSlice.actions;
export const { selectAllGroups } = groupSlice.selectors;

export default groupSlice.reducer;
