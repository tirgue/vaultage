import { SliceObject } from './slice-object';

export type SliceState<T extends Record<string, unknown>> = {
  byId: Record<string, SliceObject<T>>;
  allIds: string[];
};
