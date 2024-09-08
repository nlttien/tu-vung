import React, { useContext, useState } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Removed unused state: [notification, setNotification]

  const { login, register } = useAuth();
  const { message } = useContext(AuthContext);

  useAuthRedirect(false, "/admin", "/");

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
          {message && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              {message}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button 
                type="button" // Added type to button
                onClick={() => login(username, password)}
                className="flex-1 py-2 bg-blue-500 text-center text-white rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              <button 
                type="button" // Added type to button
                onClick={() => register(username, password)}
                className="flex-1 py-2 bg-green-500 text-center text-white rounded-md hover:bg-green-600"
              >
                Register
              </button>
            </div>
          </div>
        </form>
        {/* Removed unused Notification component */}
      </div>
    </div>
  );
};

export default Login;
