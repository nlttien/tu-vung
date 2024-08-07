// src/components/ErrorPage.js
import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="flex flex-col items-center text-center">
        <svg className="w-24 h-24 text-red-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M4.293 4.293a1 1 0 011.414 0L12 8.586l6.293-6.293a1 1 0 111.414 1.414L13.414 10l6.293 6.293a1 1 0 01-1.414 1.414L12 12.414 5.707 18.707a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z" />
        </svg>
        <h1 className="text-4xl font-bold text-red-700">Something Went Wrong</h1>
        <p className="mt-2 text-red-600 text-lg">{error ? `Error: ${error}` : "An unknown error occurred"}</p>
      </div>
    </div>
  );
};

export default Error;
