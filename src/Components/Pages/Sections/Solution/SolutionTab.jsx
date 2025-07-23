import React from 'react';

const SolutionTab = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
      <div className="w-12 h-12 mb-4 text-blue-400">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default SolutionTab;
