import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Login/Auth.tsx';
import Login from './Login/Login.tsx';
import PrivateRoute from './Login/PrivateRouter.tsx';
import Home from './Home/Home.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clientes" element={<PrivateRoute><h1>Clientes Page</h1></PrivateRoute>} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
