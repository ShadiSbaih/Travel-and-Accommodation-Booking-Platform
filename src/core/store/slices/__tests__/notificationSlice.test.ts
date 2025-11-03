import notificationReducer, {
  showNotification,
  hideNotification,
  type NotificationState,
} from '../notificationSlice';

describe('notificationSlice', () => {
  const initialState: NotificationState = {
    open: false,
    message: '',
    severity: 'success',
    key: 0,
  };

  it('should return initial state', () => {
    expect(notificationReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle showNotification with default severity', () => {
    const actual = notificationReducer(
      initialState,
      showNotification({ message: 'Test message' })
    );

    expect(actual.open).toBe(true);
    expect(actual.message).toBe('Test message');
    expect(actual.severity).toBe('success');
    expect(actual.key).toBeGreaterThan(0);
  });

  it('should handle showNotification with custom severity', () => {
    const actual = notificationReducer(
      initialState,
      showNotification({ message: 'Error occurred', severity: 'error' })
    );

    expect(actual.open).toBe(true);
    expect(actual.message).toBe('Error occurred');
    expect(actual.severity).toBe('error');
  });

  it('should handle hideNotification', () => {
    const stateWithNotification: NotificationState = {
      open: true,
      message: 'Test',
      severity: 'info',
      key: 123,
    };

    const actual = notificationReducer(stateWithNotification, hideNotification());

    expect(actual.open).toBe(false);
  });
});
