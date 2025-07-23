import React from 'react';
import { Link } from 'react-router';

const GetStarted = () => {
  return (
    <div className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-4xl font-extrabold mb-4 text-blue-400">
          Get Started
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Ready to transform your clinical documentation process? Contact our team to learn how Clin Technologies can be tailored to your specific healthcare setting.
        </p>

        <p className="text-lg text-gray-300 mb-12">
          Or reach us directly via email at{' '}
          <a href="mailto:support@clintechso.com" className="text-blue-400 hover:underline">
            support@clintechso.com
          </a>
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to='/login' >
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
            Login</button></Link>
         <Link to='/register' ><button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
            Signup</button></Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
