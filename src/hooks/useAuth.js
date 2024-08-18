import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import config from "../untils/config";

const useAuth = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const roleDefault = "user";

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${config.BE_URI}/api/auth/login`, {
        username,
        password
      }, {
        withCredentials: true,
      });

      setIsAuthenticated(true); // Assuming `setIsAuthenticated` exists
      setRole(response.data.role); // Assuming `setRole` exists

      const navigateTo = response.data.role === 'user' ? '/' : '/admin';
      navigate(navigateTo);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${config.BE_URI}/api/auth/logout`, {}, { withCredentials: true });

      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const register = async (username, password) => {
    await axios.post(`${config.BE_URI}/api/auth/register`, { username, password, role: roleDefault }, { withCredentials: true })
      .then((response) => {
        alert(response.data.message);
      }).catch((err) => {
        console.error('Registration failed', err);
      });
  };

  // Hàm làm mới token
  const refreshToken = async () => {
    try {
      const response = await axios.post(`${config.BE_URI}/api/auth/refresh-token`,{}, {
        withCredentials: true,
      });

      // Cập nhật trạng thái xác thực và vai trò nếu cần
      setIsAuthenticated(true);
      setRole(response.data.role); // Giả sử bạn có vai trò trong phản hồi

      return response.data.accessToken; // Trả về token mới nếu cần
    } catch (error) {
      console.error('Refresh token failed', error);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return { login, logout, register, refreshToken };
};

export default useAuth;
