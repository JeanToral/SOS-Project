
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Login/Auth.tsx';
import Login from './Login/Login.tsx';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/clientes" element={<h1>Clientes</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;