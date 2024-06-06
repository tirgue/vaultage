import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { SliceObject, SliceState, Switcher } from '../types';
import { selectAllIds, selectById } from './common-selector';
import { getInitialState } from './get-initial-state';
import { deleteGroup } from './groups.slice';

const initialState: SliceState<Switcher> = getInitialState('switcher');

export const switcherSlice = createSlice({
  name: 'switcher',
  initialState,
  reducers: {
    addSwitcher: (state, { payload: switcher }: PayloadAction<Switcher>) => {
      state.byId[switcher.key] = {
        ...switcher,
        id: switcher.key,
      };
      state.allIds.push(switcher.key);
    },
    deleteSwitcher: (
      state,
      { payload: switcherKey }: PayloadAction<string>,
    ) => {
      delete state.byId[switcherKey];
      state.allIds = state.allIds.filter((id) => id !== switcherKey);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteGroup, (state, { payload: groupName }) => {
      const switcherIds: string[] = [];

      state.byId = Object.entries(state.byId).reduce<typeof state.byId>(
        (acc, [id, switcher]) => {
          if (switcher.groupName === groupName) return acc;

          switcherIds.push(id);
          return {
            ...acc,
            [id]: switcher,
          };
        },
        {},
      );

      state.allIds = switcherIds;
    });
  },
  selectors: {
    selectAllSwitchers: createSelector(
      selectById,
      selectAllIds,
      (byId, allIds) => allIds.map((id) => byId[id]),
    ),
    selectSwitcherByGroup: createSelector(
      selectById,
      (_, groupName: string) => groupName,
      (byId: Record<string, SliceObject<Switcher>>, groupName) =>
        Object.values(byId).filter(
          (switcher) => switcher.groupName === groupName,
        ),
    ),
  },
});

export const { addSwitcher, deleteSwitcher } = switcherSlice.actions;
export const { selectAllSwitchers, selectSwitcherByGroup } =
  switcherSlice.selectors;

export default switcherSlice.reducer;
