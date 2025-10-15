import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './context/Theme/ThemeProvider.tsx'
import AppRoutes from './routes/AppRoutes.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient.ts'
import AppErrorBoundary from './components/common/ErrorBoundary'
import { store } from './store/index.ts'
import { Provider } from 'react-redux';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <ThemeProvider>
          <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </AppErrorBoundary>
  </StrictMode>,
)