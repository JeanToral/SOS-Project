import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Login/Auth.tsx';
import Login from './Login/Login.tsx';
import PrivateRoute from './Login/PrivateRouter.tsx';
import Home from './Home/Home.tsx';
import Buscar from '../Components/Buscar/Buscar.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/buscar" element={<Buscar />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
