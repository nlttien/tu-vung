import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`fixed bottom-4 right-4 p-4 mb-4 w-80 rounded-lg shadow-lg ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`} role="alert">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{type === 'error' ? 'Error' : 'Success'}</span>
        <button onClick={onClose} className="ml-2 text-xl font-bold">&times;</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
