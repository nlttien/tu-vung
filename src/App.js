import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import VocabularyTable from './pages/admin/VocabularyTable';
import Dashboard from './pages/admin/dashboard';
import NotFound from './pages/notFound';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin'); // Check if the current path starts with /admin

  return (
    <div>
      {(!isLoginPage && !isAdminPage) && <Header />} {/* Render Header only if not on the login page */}
      {(!isLoginPage && !isAdminPage) && <Breadcrumb />} {/* Render Breadcrumb only if not on the login page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/type" element={<Type />} />
        <Route path="/game" element={<Game />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="vocabulary" element={<VocabularyTable />} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
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
