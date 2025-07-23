import React from 'react';
import { Link } from 'react-router';

const Benefits = () => {
  const benefitsList = [
    'Reduction in documentation time by 40-60%',
    'Improved work-life balance with less after-hours charting',
    'Enhanced patient interaction due to less focus on note-taking',
    'More comprehensive and consistent clinical documentation',
    'Reduced risk of documentation errors and omissions',
  ];

  return (
    <section id="benefits" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-400">
          Benefits
        </h2>
        <p className="text-xl text-center text-gray-300 mb-12">
          Healthcare providers using Clin Technologies solutions report:
        </p>

        <ul className="list-none space-y-4 text-left mx-auto max-w-2xl mb-12">
          {benefitsList.map((benefit, index) => (
            <li key={index} className="flex items-start text-lg text-gray-200">
           
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

           <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4" data-aos="fade-down" data-aos-delay="600">
                    <Link to="/login">
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
                        Signup
                      </button>
                    </Link>
                  </div> 
      </div>
    </section>
  );
};

export default Benefits;