src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { propertiesApi } from './api/propertiesApi';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      propertiesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;