import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { Link } from 'react-router'; // ✅ Link কে 'react-router-dom' থেকে ইম্পোর্ট করা হয়েছে
import { AuthContext } from '../../Context/AuthContext';

const API_BASE_URL = 'https://backend.gameplanai.co.uk/';

const UserProfile = () => {
  const { userProfile } = useContext(AuthContext); // AuthContext থেকে userProfile ডেটা নেওয়া হচ্ছে
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      // localStorage থেকে access_token নেওয়া হচ্ছে
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        setError('No access token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(''); // নতুন রিকোয়েস্টের আগে এরর স্টেট রিসেট করা
        const response = await axios.get(`${API_BASE_URL}authentication_app/user_profile/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // অথরাইজেশন হেডার যোগ করা
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.status === 200) {
          setProfileData(response.data);
        } else {
          setError(response.data.message || 'Failed to fetch user profile.');
        }
      } catch (err) {
        if (err.response) {
          // সার্ভার থেকে এরর রেসপন্স এসেছে
          setError(err.response.data.message || err.response.data.detail || 'Failed to fetch user profile.');
        } else if (err.request) {
          // রিকোয়েস্ট পাঠানো হয়েছে কিন্তু কোনো রেসপন্স আসেনি (যেমন নেটওয়ার্ক এরর)
          setError('Network error. Please check your internet connection or try again later.');
        } else {
          // রিকোয়েস্ট সেটআপ করার সময় এরর হয়েছে
          setError('An unexpected error occurred. Please try again.');
        }
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    // userProfile পরিবর্তন হলে ডেটা রি-ফেচ করবে
    // অথবা কম্পোনেন্ট প্রথমবার মাউন্ট হলে ডেটা ফেচ করবে
    fetchUserProfile();
  }, [userProfile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="ml-3 text-lg">Loading user profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400 text-lg p-4">
        <p>Error: {error}</p>
        <p className="ml-4">Please ensure you are logged in and have a valid token.</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400 text-lg p-4">
        <p>No user profile data available. Please log in.</p>
      </div>
    );
  }

  // প্রোফাইল ডেটা থাকলে তা প্রদর্শন করুন
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-extrabold text-center mb-6">User Profile</h2>

        {/* ✅ এখানে গ্রিড লেআউট যোগ করা হয়েছে */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(profileData).map(([key, value]) => (
            <div key={key} className="flex  justify-between p-3 bg-gray-700 rounded-md">
              <span className="font-semibold text-gray-300 capitalize text-sm mb-1">{key.replace(/_/g, ' ')}:</span> {/* underscores to spaces */}
              <span className="text-gray-200 break-words text-base">
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'N/A'}
              </span>
            </div>
          ))}
        </div>

        {/* আপনি চাইলে এখানে আরও বাটন বা লিঙ্ক যোগ করতে পারেন */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

