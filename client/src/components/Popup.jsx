import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4 text-center">{message}</h2> {/* Center the message */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
