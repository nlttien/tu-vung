import React, { useContext, useState } from 'react';
import axios from 'axios';
import Notification from '../../components/notification';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../components/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const roleDefault = "user"

  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useAuthRedirect(false, "/admin", "/");

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Thông báo sẽ biến mất sau 3 giây
  };

  const register = async () => {
    await axios.post('http://localhost:3001/register', { username, password, role: roleDefault })
      .then((response) => {
        showNotification(response.data.message, 'success');
      }).catch((err) => {
        showNotification(err.response.data.message, "error", err.response.data.message);
      });
  };

  const login = async () => {
    await axios.post('http://localhost:3001/login', { username, password, role: roleDefault }, {
      withCredentials: true // Include cookies in the request
    }).then((response) => {
      alert(response.data.message)

      setIsAuthenticated(true)
      setRole(response.data.role);

      if (response.data.role === "user") {
        navigate('/');
        return null;
      } else if (response.data.role === "admin") {
        navigate('/admin');
        return null;
      }

      showNotification(response.data.message, 'success');
    }).catch((err) => {
      showNotification(err.response.data.message, "error", err.response.data.message);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div
                onClick={login}
                className="flex-1 py-2 bg-blue-500 text-center text-white rounded-md hover:bg-blue-600"
              >
                Login
              </div>
              <div
                onClick={register}
                className="flex-1 py-2 bg-green-500 text-center text-white rounded-md hover:bg-green-600"
              >
                Register
              </div>
            </div>
          </div>
        </form>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div >
    </div >
  );
};

export default Login;