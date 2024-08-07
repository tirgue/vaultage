import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { groupReducer, masterPasswordReducer, switcherReducer } from './slices';

const saveToStorageMiddleware = createListenerMiddleware();

saveToStorageMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: () => true,
  effect: (_, listenerApi) => {
    const state = listenerApi.getState();
    const cleanState = { ...state, masterPassword: undefined };
    localStorage.setItem('root', JSON.stringify(cleanState));
  },
});

export const store = configureStore({
  reducer: {
    group: groupReducer,
    masterPassword: masterPasswordReducer,
    switcher: switcherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToStorageMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
