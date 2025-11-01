import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

export interface NotificationState {
  open: boolean;
  message: string;
  severity: NotificationSeverity;
}

const initialState: NotificationState = {
  open: false,
  message: '',
  severity: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; severity?: NotificationSeverity }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'success';
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
