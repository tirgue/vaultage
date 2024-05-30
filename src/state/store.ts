import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import cabinetReducer from './cabinet.slice';

const saveToStorageMiddleware = createListenerMiddleware();

saveToStorageMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: () => true,
  effect: (_, listenerApi) => {
    localStorage.setItem(
      'root',
      JSON.stringify(listenerApi.getState().cabinet)
    );
  },
});

export const store = configureStore({
  reducer: {
    cabinet: cabinetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToStorageMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
