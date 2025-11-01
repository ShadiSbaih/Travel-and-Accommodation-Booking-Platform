import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@/core/context/Theme/ThemeProvider'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { createAppTheme } from '@/core/theme/muiTheme'
import useTheme from '@/core/context/Theme/useTheme'
import AppRoutes from '@/core/routes/AppRoutes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/core/api/queryClient'
import {AppErrorBoundary} from '@/shared/components/ErrorBoundary'
import { store } from '@/core/store'
import { Provider } from 'react-redux';
import GlobalSnackbar from '@/shared/components/GlobalSnackbar';

// Wrapper to access theme context
function AppWithTheme() {
  const { isDark } = useTheme();
  const muiTheme = createAppTheme(isDark);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
        <GlobalSnackbar />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AppWithTheme />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </AppErrorBoundary>
  </StrictMode>
)
