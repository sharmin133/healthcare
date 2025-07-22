// src/components/features/auth/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios'; // API কল করার জন্য axios ব্যবহার করা হচ্ছে

// API Base URL (আপনার .env ফাইলে এটি সেট করা উচিত)
// .env ফাইলে REACT_APP_API_BASE_URL=https://backend.gameplanai.co.uk/ যোগ করুন
const API_BASE_URL ='https://backend.gameplanai.co.uk/';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '', // AGCOURT TALK CHATBOT API requirement অনুযায়ী যোগ করা হয়েছে
    username: '', // AGCOURT TALK CHATBOT API requirement অনুযায়ী যোগ করা হয়েছে
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ইনপুট ফিল্ডের ভ্যালু হ্যান্ডেল করার জন্য
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // টাইপ করার সময় এরর মেসেজ সরিয়ে দিন
    setSuccessMessage(''); // টাইপ করার সময় সফলতার মেসেজ সরিয়ে দিন
  };

  // ফর্ম সাবমিট হ্যান্ডেল করার জন্য
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // ক্লায়েন্ট-সাইড ভ্যালিডেশন
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name || !formData.username) {
      setError('All fields (Email, Password, Name, Username) are required.');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) { // উদাহরণস্বরূপ, পাসওয়ার্ডের ন্যূনতম দৈর্ঘ্য
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      // API কল: email, password, name, এবং username পাঠানো হচ্ছে
      const response = await axios.post(`${API_BASE_URL}authentication_app/signup/`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        username: formData.username,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      // সফল রেসপন্স হ্যান্ডেল করা
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Registration successful! Please check your email for OTP verification.');
        // সফল হলে ফর্ম রিসেট করতে পারেন
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          username: '',
        });
      } else {
        // যদি সার্ভার থেকে 2xx ছাড়া অন্য কোনো সফল কোড আসে (যদিও সাধারণত 200/201 আসে)
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // এরর হ্যান্ডেল করা
      if (err.response) {
        // সার্ভার থেকে এরর রেসপন্স এসেছে
        setError(err.response.data.message || err.response.data.detail || 'Registration failed. Please try again.');
      } else if (err.request) {
        // রিকোয়েস্ট পাঠানো হয়েছে কিন্তু কোনো রেসপন্স আসেনি (যেমন নেটওয়ার্ক এরর)
        setError('No response from server. Please check your internet connection or try again later.');
      } else {
        // রিকোয়েস্ট সেটআপ করার সময় এরর হয়েছে
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Navbar (যদি আপনি এটি একটি পূর্ণাঙ্গ পেজ হিসেবে রেন্ডার করেন, তাহলে Navbar এখানে থাকবে না) */}
      {/* <Navbar /> */}

      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter the email address associated with your account. We'll send you an OTP to your email.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Name Input (API requirement) */}
          <div>
            <label htmlFor="name" className="sr-only">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Username Input (API requirement) */}
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* New Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter New Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="text-green-400 text-sm text-center">
              {successMessage}
            </div>
          )}

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>

        {/* Already Have An Account? Login */}
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-400 hover:text-blue-500">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
