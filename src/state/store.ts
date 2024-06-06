import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import groupReducer from './groups.slice';
import masterPasswordReducer from './master-password.slice';
import switcherReducer from './switchers.slice';

const saveToStorageMiddleware = createListenerMiddleware();

saveToStorageMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: () => true,
  effect: (_, listenerApi) => {
    const state: Partial<ReturnType<typeof listenerApi.getState>> =
      listenerApi.getState();
    delete state.masterPassword;
    localStorage.setItem('root', JSON.stringify(state));
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
