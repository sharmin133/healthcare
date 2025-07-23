// src/components/ui/SolutionTab.js
import React from 'react';

const SolutionCard = ({ title, isActive, onClick }) => {
  return (
    <button
      className={`px-6 py-3 text-lg font-semibold rounded-t-lg transition-colors duration-300
                  ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SolutionCard;