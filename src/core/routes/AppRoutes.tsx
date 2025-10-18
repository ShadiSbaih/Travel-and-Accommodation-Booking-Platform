import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';

// User pages
import { HomePage } from '@/features/home';
import { SearchResultPage } from '@/features/search';
import { HotelDetailsPage } from '@/features/hotels';
import { CheckoutPage, ConfirmationPage } from '@/features/bookings';

// Admin pages
import { HotelsPage, CitiesPage, RoomsPage } from '@/features/admin';

// Not Found page
import NotFound from '@/shared/components/NotFoundPage';

const AppRoutes = () => {
    return (
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
    );
};

export default AppRoutes;