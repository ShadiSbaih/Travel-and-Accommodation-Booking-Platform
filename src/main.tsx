import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppProviders } from '@/core/providers';
import AppRoutes from '@/core/routes/AppRoutes';
import GlobalSnackbar from '@/shared/components/GlobalSnackbar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRoutes />
      <GlobalSnackbar />
    </AppProviders>
  </StrictMode>
);
