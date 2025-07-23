import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const API_BASE_URL = 'https://backend.gameplanai.co.uk/';

const Login = () => {
 const [formData, setFormData] = useState({ email: '', password: '' });
 const [error, setError] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 const [loading, setLoading] = useState(false);
 const [rememberMe, setRememberMe] = useState(false);

 const { login } = useContext(AuthContext);
 const navigate = useNavigate();

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  setError('');
  setSuccessMessage('');
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccessMessage('');

  if (!formData.email || !formData.password) {
   setError('Email and Password are required.');
   setLoading(false);
   return;
  }

  try {
   const response = await axios.post(
    `${API_BASE_URL}authentication_app/login/`,
    {
     email: formData.email,
     password: formData.password,
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
     },
    }
   );

   if (response.status === 200 || response.status === 201) {
    login(response.data); 
    setSuccessMessage('Login successful! Redirecting...');
    navigate('/');
   } else {
    setError(response.data.message || 'Login failed. Please check your credentials.');
   }
  } catch (err) {
   if (err.response) {
    setError(
     err.response.data.message ||
     err.response.data.detail ||
     'Login failed. Please check your email and password.'
    );
   } else if (err.request) {
    setError('No response from server. Please check your internet connection or try again later.');
   } else {
    setError('An unexpected error occurred. Please try again.');
   }
   console.error('Login error:', err);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
    <div>
     <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Hello, Welcome!</h2>
     <p className="mt-2 text-center text-sm text-gray-400">Please Enter Your Details Below To Continue</p>
    </div>

    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
     <div>
      <label htmlFor="email" className="sr-only">Your Email</label>
      <input
       id="email"
       name="email"
       type="email"
       autoComplete="email"
       required
       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
       placeholder="Your Email"
       value={formData.email}
       onChange={handleChange}
      />
     </div>

     <div>
      <label htmlFor="password" className="sr-only">Password</label>
      <input
       id="password"
       name="password"
       type="password"
       autoComplete="current-password"
       required
       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
       placeholder="Password"
       value={formData.password}
       onChange={handleChange}
      />
     </div>

     <div className="flex items-center justify-between">
      <div className="flex items-center">
       <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
       />
       <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
        Remember Me
       </label>
      </div>

      <div className="text-sm">
       <a href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-500">
        Forgot Password?
       </a>
      </div>
     </div>

     {error && <div className="text-red-400 text-sm text-center">{error}</div>}
     {successMessage && <div className="text-green-400 text-sm text-center">{successMessage}</div>}

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
         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
         <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
         ></path>
        </svg>
       ) : (
        'Login'
       )}
      </button>
     </div>
    </form>

    <div className="text-center text-sm text-gray-400">
     Create an account,{' '}
     <a href="/register" className="font-medium text-blue-400 hover:text-blue-500">
      Sign Up
     </a>
    </div>
   </div>
  </div>
 );
};

export default Login;
