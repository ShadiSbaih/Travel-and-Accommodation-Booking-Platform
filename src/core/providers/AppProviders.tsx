import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@/core/context/Theme/ThemeProvider';
import { AppErrorBoundary } from '@/shared/components/ErrorBoundary';
import { store } from '@/core/store';
import { queryClient } from '@/core/api/queryClient';
import { createAppTheme } from '@/core/theme/muiTheme';
import useTheme from '@/core/context/Theme/useTheme';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * MUI Theme Provider Wrapper
 * Accesses theme context to create MUI theme
 */
function MuiThemeWrapper({ children }: AppProvidersProps) {
  const { isDark } = useTheme();
  const muiTheme = createAppTheme(isDark);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

/**
 * App Providers Component
 * Combines all application providers in the correct order
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppErrorBoundary>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <MuiThemeWrapper>
              <BrowserRouter>
                {children}
              </BrowserRouter>
            </MuiThemeWrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </AppErrorBoundary>
  );
}
