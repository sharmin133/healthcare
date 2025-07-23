import React from 'react';

const SolutionCard = ({ title, isActive, onClick, roundedClass }) => {
  return (
    <button
      className={`w-full py-5 text-lg font-semibold border-x-2 transition-colors duration-300
        ${isActive ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-300 hover:bg-gray-600'}
        ${roundedClass}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SolutionCard;