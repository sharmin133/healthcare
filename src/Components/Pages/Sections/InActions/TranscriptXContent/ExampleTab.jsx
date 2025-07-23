import React from 'react';

const ExampleTab = ({ title, isActive, onClick }) => {
  return (
    <button
      className={`px-6 py-2 text-base font-medium rounded-md transition-colors duration-300
                  ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ExampleTab;


