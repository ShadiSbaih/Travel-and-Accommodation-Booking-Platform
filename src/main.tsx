import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppProviders } from '@/core/providers';
import AppRoutes from '@/core/routes/AppRoutes';
import GlobalSnackbar from '@/shared/components/GlobalSnackbar';

// Hide initial loader after React is ready
const hideInitialLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.classList.add('hidden');
    // Remove from DOM after animation
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
};

// Hide loader when React starts rendering
hideInitialLoader();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRoutes />
      <GlobalSnackbar />
    </AppProviders>
  </StrictMode>
);
