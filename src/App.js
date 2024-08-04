import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import './App.css';
import Login from './pages/login/login';
import { AuthProvider } from './contexts/AuthContext';
import Search from './pages/search';
import Game from './pages/game';
import Type from './pages/type';
import Header from './components/header';
import Breadcrumb from './components/breadcrumb';
import AdminPage from './pages/admin/AdminPage';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname === '/admin';

  return (
    <div>
      {(!isLoginPage && !isAdminPage) && <Header />} {/* Render Header only if not on the login page */}
      {(!isLoginPage && !isAdminPage) && <Breadcrumb />} {/* Render Header only if not on the login page */}
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/type" element={<Type />} />
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWithRouter;