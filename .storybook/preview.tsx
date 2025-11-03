import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '../src/index.css';
import { createAppTheme } from '../src/core/theme/muiTheme';

// Create a light theme for Storybook
const theme = createAppTheme(false);

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
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
