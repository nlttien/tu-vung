import React, { useContext, useState } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../contexts/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Use a single error message state
  const { login, register } = useAuth();
  const { message } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(null); // Clear error message on input change
  };

  const handleRegisterClick = async () => {
    // Perform basic validation
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    setIsRegistering(true); // Chuyển sang chế độ đăng ký
    setErrorMessage(null); // Xóa thông báo lỗi
    const mess = await register(email, password);
    if (mess != "Error registering user") {
      await login(email, password)
    }
    setIsRegistering(false); // Chuyển sang chế độ đăng ký
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(null); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform basic validation
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoggingIn(true);
      await login(email, password);
      setIsLoggingIn(false);

      console.log("Login submitted", { email, password });
    } catch (error) {
      // Handle login errors from useAuth hook
      setErrorMessage(error.message || "Login failed");
    }
  };

  useAuthRedirect(false, "/admin", "/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 border ${errorMessage ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors pl-10`}
                placeholder="Enter your email"
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 border ${errorMessage ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors pl-10 pr-10`}
                placeholder="Enter your password"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {errorMessage && ( // Display a single error message
            <p className="mt-1 text-xs text-red-500 animate-pulse">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-300 transform hover:scale-105"
            disabled={isRegistering || isLoggingIn}
          >
            {isRegistering ? "Registering..." : isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {message}
          </div>
        )}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <button
            href=""
            onClick={handleRegisterClick}
            className="font-medium text-purple-600 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-sm"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
