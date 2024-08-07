import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
