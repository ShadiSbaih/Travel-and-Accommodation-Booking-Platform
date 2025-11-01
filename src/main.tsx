import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@/core/context/Theme/ThemeProvider'
import AppRoutes from '@/core/routes/AppRoutes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/core/api/queryClient'
import {AppErrorBoundary} from '@/shared/components/ErrorBoundary'
import { store } from '@/core/store'
import { Provider } from 'react-redux';
import GlobalSnackbar from '@/shared/components/GlobalSnackbar';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <BrowserRouter>
              <AppRoutes />
              <GlobalSnackbar />
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </AppErrorBoundary>
  </StrictMode>
)
