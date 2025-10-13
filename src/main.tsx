import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './context/Theme/ThemeProvider.tsx'
import AppRoutes from './routes/AppRoutes.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient.ts'
import AppErrorBoundary from './components/common/ErrorBoundary'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  </StrictMode>,
)