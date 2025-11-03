import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import '../src/index.css';
import { createAppTheme } from '../src/core/theme/muiTheme';
import { queryClient } from '../src/core/api/queryClient';
import filterReducer from '../src/features/filters/store/filterSlice';
import cartReducer from '../src/features/cart/store/cartSlice';
import notificationReducer from '../src/core/store/slices/notificationSlice';
import adminUiReducer from '../src/core/store/slices/adminUiSlice';

// Create a mock store for Storybook
const mockStore = configureStore({
  reducer: {
    filters: filterReducer,
    cart: cartReducer,
    notification: notificationReducer,
    adminUi: adminUiReducer,
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fafaf9', // Match theme background.default light
        },
        {
          name: 'dark',
          value: '#0f172a', // Match theme background.default dark
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === 'dark';
      const theme = createAppTheme(isDark);

      // Apply dark class to html element for Tailwind dark mode
      useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDark) {
          htmlElement.classList.add('dark');
        } else {
          htmlElement.classList.remove('dark');
        }
        
        // Set background color to match theme
        document.body.style.backgroundColor = theme.palette.background.default;
        document.body.style.color = theme.palette.text.primary;
        
        return () => {
          htmlElement.classList.remove('dark');
          document.body.style.backgroundColor = '';
          document.body.style.color = '';
        };
      }, [isDark, theme]);

      return (
        <Provider store={mockStore}>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Story />
              </ThemeProvider>
            </MemoryRouter>
          </QueryClientProvider>
        </Provider>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light Mode' },
          { value: 'dark', icon: 'moon', title: 'Dark Mode' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
