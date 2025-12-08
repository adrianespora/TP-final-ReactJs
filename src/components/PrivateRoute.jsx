import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <p style={{ fontSize: '1.5rem', color: '#667eea' }}>Cargando...</p>
      </div>
    );
  }

  return estaAutenticado() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;