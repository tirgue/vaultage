import { SliceState } from '../types';

export const selectById = <T extends Record<string, unknown>>(
  state: SliceState<T>,
) => state.byId;

export const selectAllIds = <T extends Record<string, unknown>>(
  state: SliceState<T>,
) => state.allIds;
