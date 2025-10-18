/**
 * Redux Store Configuration
 * Centralized store setup with TypeScript support
 */

import { configureStore } from '@reduxjs/toolkit';
import RootReducer from '../features/RootReducer';

/**
 * Configure and export the Redux store
 */
export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if needed
        ignoredActions: [],
      },
    }),
  devTools: true, // Enable Redux DevTools
});

/**
 * TypeScript type for the root state
 * Inferred from the store itself
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * TypeScript type for dispatch
 * Includes thunk action types
 */
export type AppDispatch = typeof store.dispatch;
