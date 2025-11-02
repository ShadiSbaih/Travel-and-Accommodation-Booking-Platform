import { Navigate } from "react-router-dom";
import { AdminLayout } from "@/shared/components/Layout";

const AdminProtectedRoute = () => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if user is admin
    if (user.role !== 'admin') {
        return <Navigate to="/home" replace />;
    }

    return <AdminLayout />;
};

export default AdminProtectedRoute;