// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

/**
 * Custom hook để điều hướng dựa trên trạng thái xác thực và vai trò người dùng.
 * @param {Object} options - Cấu hình cho hook
 * @param {boolean} options.redirectToLogin - Nếu người dùng chưa xác thực, có nên chuyển hướng đến trang đăng nhập không?
 * @param {string} options.adminPath - Đường dẫn cho admin
 * @param {string} options.userPath - Đường dẫn cho người dùng
 */
const useAuthRedirect = ({ redirectToLogin = true, adminPath = '/admin', userPath = '/' }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthNavigate = async () => {
      if (isAuthenticated === null) {
        return;
      }

      if (!isAuthenticated && redirectToLogin) {
        navigate('/login');
        return;
      }

      if (isAuthenticated && role === "admin") {
        navigate(window.location.pathname.startsWith("/admin") ? window.location.pathname : "/admin");
        return;
      }

      if (isAuthenticated && role === "user") {
        navigate(window.location.pathname.startsWith("/user") ? window.location.pathname : "/user");
        return;
      }
    };

    checkAuthNavigate();
  }, [isAuthenticated, navigate, role, redirectToLogin, adminPath, userPath]);
};

export default useAuthRedirect;
