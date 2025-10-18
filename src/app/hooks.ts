/**
 * Redux Hooks
 * Typed hooks for use throughout the application
 */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Pre-typed useDispatch hook
 * Use throughout the app instead of plain `useDispatch`
 */
export const useAppDispatch = useDispatch<AppDispatch>;

/**
 * Pre-typed useSelector hook
 * Use throughout the app instead of plain `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
