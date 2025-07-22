import React from 'react';

const Benefits = () => {
  const benefitsList = [
    'Reduction in documentation time by 40-60%',
    'Improved work-life balance with less after-hours charting',
    'Enhanced patient interaction due to less focus on note-taking',
    'More comprehensive and consistent clinical documentation',
    'Reduced risk of documentation errors and omissions',
  ];

  return (
    <section id="benefits" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-400">
          Benefits
        </h2>
        <p className="text-lg text-center text-gray-300 mb-12">
          Healthcare providers using Clin Technologies solutions report:
        </p>

        <ul className="list-none space-y-4 text-left mx-auto max-w-2xl mb-12">
          {benefitsList.map((benefit, index) => (
            <li key={index} className="flex items-start text-lg text-gray-200">
              {/* চেক আইকন (আপনি আপনার পছন্দের আইকন ব্যবহার করতে পারেন) */}
              <svg
                className="flex-shrink-0 w-6 h-6 text-green-400 mr-3 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-transparent border-2 border-blue-600 text-blue-400 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
            Login
          </button>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
            Signup
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;