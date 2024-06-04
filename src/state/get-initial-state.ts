export const getInitialState = (slice: string) =>
  JSON.parse(localStorage.getItem('root') ?? '{}')[slice] ?? {
    allIds: [],
    byId: {},
  };
