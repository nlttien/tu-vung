import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white pt-10 p-5 rounded-lg shadow-lg relative">
        <button
          className="absolute top-7 right-5 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <span className="block w-6 h-6 relative">
            <span className="absolute block w-full h-1 bg-gray-600 transform rotate-45"></span>
            <span className="absolute block w-full h-1 bg-gray-600 transform -rotate-45"></span>
          </span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
