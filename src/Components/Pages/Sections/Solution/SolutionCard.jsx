import React from 'react';

const SolutionCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700
                    transform hover:scale-105 transition-transform duration-300 ease-in-out
                    flex flex-col items-start text-left">
      <div className="mb-4 text-blue-400" style={{ width: '60px', height: '60px' }}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 text-base">{description}</p>
    </div>
  );
};

export default SolutionCard;
