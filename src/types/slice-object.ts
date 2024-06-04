export type SliceObject<T extends Record<string, unknown>> = T & {
  id: string;
};
