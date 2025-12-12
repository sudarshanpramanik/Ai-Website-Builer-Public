import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { AppRoute } from './types';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen bg-black" />; // Avoids flash of redirect
  if (!isAuthenticated) return <Navigate to={AppRoute.LOGIN} replace />;
  
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <Layout>
      <Routes>
        <Route path={AppRoute.HOME} element={<Home />} />
        <Route path={AppRoute.TEMPLATES} element={<Templates />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.SIGNUP} element={<Signup />} />
        
        <Route 
          path={AppRoute.BUILDER} 
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={AppRoute.DASHBOARD} 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to={AppRoute.HOME} replace />} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;