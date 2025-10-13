import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';

// User pages
import Home from '@/pages/UserPages/HomePage';
import SearchResult from '@/pages/UserPages/SearchResultPage';
import HotelDetails from '@/pages/UserPages/HotelDetailsPage';
import Checkout from '@/pages/UserPages/CheckoutPage';
import Confirmation from '@/pages/UserPages/ConfirmationPage';

// Admin pages
import Hotels from '@/pages/AdminPages/HotelsPage';
import Cities from '@/pages/AdminPages/CitiesPage';
import Rooms from '@/pages/AdminPages/RoomsPage';

// Not Found page
import NotFound from '@/pages/NotFoundPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/search-results" element={<SearchResult />} />
                <Route path="/hotels/:id" element={<HotelDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation" element={<Confirmation />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/hotels" element={<Hotels />} />
                <Route path="/admin/cities" element={<Cities />} />
                <Route path="/admin/rooms" element={<Rooms />} />
            </Route>

            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            {/* 404 - Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;