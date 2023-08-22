import React from 'react';

const AlertBox = ({ message }) => {
  console.log(message)
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-md mb-4">
      {message}
    </div>
  );
};

export default AlertBox;
