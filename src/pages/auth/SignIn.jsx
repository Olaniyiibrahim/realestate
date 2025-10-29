import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  KeyIcon,
  BuildingStorefrontIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

import { supabase } from '../../lib/supabase';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const SignIn = () => {
    // Add these constants at the top of your component

const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'customer' // 'customer' or 'agent'
});
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const navigate = useNavigate();

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
};


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (error) throw error;

        toast.success(`Welcome back, ${data.user.user_metadata?.name || data.user.email}!`);
        navigate('/');

    } catch (err) {
        console.error('Sign in error:', err);
        setError(err.message || 'Sign in failed. Please check your credentials.');
        toast.error(err.message || 'Sign in failed');
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <KeyIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your personalized real estate experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* User Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'customer' }))}
                className={`flex items-center justify-center px-4 py-2 rounded-md border transition-colors ${
                  formData.userType === 'customer'
                    ? 'border-gray-700 shadow bg-blue-50 text-black'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <UserIcon className="h-5 w-5 mr-2" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, userType: 'agent' }))}
                className={`flex items-center justify-center px-4 py-2 rounded-md border transition-colors ${
                  formData.userType === 'agent'
                    ? 'border-gray-700 shadow bg-blue-50 text-black'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BuildingStorefrontIcon className="h-5 w-5 mr-2" />
                House Owner
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-750 focus:border-black"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              {/* <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p> */}
              <p className="text-sm text-blue-700 mt-1">
                <NavLink to="/forgetpassword" className="text-blue-600 hover:text-blue-800 font-medium">
                  forget password?
                </NavLink>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to EstatePro?</span>
              </div>
            </div>

            {/* Sign Up Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/signup"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <UserGroupIcon className="h-4 w-4 mr-2" />
                Customer Sign Up
              </Link>
              <Link
                to="/signup"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <BuildingStorefrontIcon className="h-4 w-4 mr-2" />
                Agent Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;