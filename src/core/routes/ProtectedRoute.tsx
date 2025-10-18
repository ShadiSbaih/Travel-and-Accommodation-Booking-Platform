import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if user is not an admin (regular user)
    if (user.role === 'admin') {
        return <Navigate to="/admin/hotels" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;