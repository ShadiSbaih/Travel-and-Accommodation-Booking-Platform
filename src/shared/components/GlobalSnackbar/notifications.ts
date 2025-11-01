/**
 * Global Notification System
 * 
 * This file exports utilities for using the global notification/snackbar system.
 * The notification system is built with Redux and displays messages to users
 * in a consistent, global manner.
 */

export { default as GlobalSnackbar } from './GlobalSnackbar';
export { useNotification } from '@/shared/hooks/useNotification';
export { showNotification, hideNotification } from '@/core/store/slices/notificationSlice';
export type { NotificationSeverity, NotificationState } from '@/core/store/slices/notificationSlice';

/**
 * Usage Example:
 * 
 * ```tsx
 * import { useNotification } from '@/shared/hooks/useNotification';
 * 
 * function MyComponent() {
 *   const { notify } = useNotification();
 * 
 *   const handleSuccess = () => {
 *     notify('Operation successful!', 'success');
 *   };
 * 
 *   const handleError = () => {
 *     notify('Something went wrong', 'error');
 *   };
 * 
 *   const handleWarning = () => {
 *     notify('Be careful!', 'warning');
 *   };
 * 
 *   const handleInfo = () => {
 *     notify('Here is some info', 'info');
 *   };
 * 
 *   return (
 *     <div>
 *       <button onClick={handleSuccess}>Success</button>
 *       <button onClick={handleError}>Error</button>
 *       <button onClick={handleWarning}>Warning</button>
 *       <button onClick={handleInfo}>Info</button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * Available Severity Levels:
 * - 'success': Green notification for successful operations
 * - 'error': Red notification for errors
 * - 'warning': Orange notification for warnings
 * - 'info': Blue notification for informational messages
 */
