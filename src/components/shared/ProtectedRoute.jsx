import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    // User is logged in but not an admin, redirect to home or a 'not authorized' page
    return <Navigate to="/" state={{ from: location }} replace />; 
  }
  
  // If children is provided directly, render it. Otherwise, Outlet will be rendered by parent.
  return children ? children : null; 
};

export default ProtectedRoute;