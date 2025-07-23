// ExampleTab.js
import React from 'react';

const ExampleTab = ({ title, isActive, onClick }) => {
  return (
    <button
      className={`py-4 text-base font-medium transition-colors duration-300
                  ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}
                  flex-1 text-center border-l border-gray-700 first:border-l-0 focus:outline-none`}
      // Added flex-1, text-center, and some border styling for separation
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ExampleTab;


