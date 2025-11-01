import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import { Box, CircularProgress } from '@mui/material';

// Lazy load all pages
const LoginPage = lazy(() => import('@/features/auth').then(module => ({ default: module.LoginPage })));
const HomePage = lazy(() => import('@/features/home').then(module => ({ default: module.HomePage })));
const SearchResultPage = lazy(() => import('@/features/search').then(module => ({ default: module.SearchResultPage })));
const HotelDetailsPage = lazy(() => import('@/features/hotels').then(module => ({ default: module.HotelDetailsPage })));
const CheckoutPage = lazy(() => import('@/features/bookings').then(module => ({ default: module.CheckoutPage })));
const ConfirmationPage = lazy(() => import('@/features/bookings').then(module => ({ default: module.ConfirmationPage })));
const HotelsPage = lazy(() => import('@/features/admin').then(module => ({ default: module.HotelsPage })));
const CitiesPage = lazy(() => import('@/features/admin').then(module => ({ default: module.CitiesPage })));
const RoomsPage = lazy(() => import('@/features/admin').then(module => ({ default: module.RoomsPage })));
const NotFound = lazy(() => import('@/shared/components/NotFoundPage'));

// Loading fallback component
const PageLoader = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default'
        }}
    >
        <CircularProgress size={60} />
    </Box>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected User Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/search-results" element={<SearchResultPage />} />
                    <Route path="/hotels/:id" element={<HotelDetailsPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<AdminProtectedRoute />}>
                    <Route path="/admin/hotels" element={<HotelsPage />} />
                    <Route path="/admin/cities" element={<CitiesPage />} />
                    <Route path="/admin/rooms" element={<RoomsPage />} />
                </Route>

                {/* Redirect root to home */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                {/* 404 - Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;