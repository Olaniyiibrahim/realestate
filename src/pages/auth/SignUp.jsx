// src/pages/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    EyeIcon, 
    EyeSlashIcon, 
    UserIcon, 
    KeyIcon,
    EnvelopeIcon,
    PhoneIcon,
    BuildingStorefrontIcon,
    UserGroupIcon,
    ArrowLeftIcon,
    IdentificationIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'customer',
        agencyName: '',
        nin: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ninVerifying, setNinVerifying] = useState(false);
    const [ninVerified, setNinVerified] = useState(false);
    const [ninVerificationData, setNinVerificationData] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateNIN = (nin) => {
        // NIN should be exactly 11 digits
        return /^\d{11}$/.test(nin);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.userType === 'agent') {
            if (!formData.agencyName.trim()) {
                newErrors.agencyName = 'Agency name is required';
            }
            if (!formData.nin.trim()) {
                newErrors.nin = 'NIN is required for agents';
            } else if (!validateNIN(formData.nin)) {
                newErrors.nin = 'NIN must be exactly 11 digits';
            } else if (!ninVerified) {
                newErrors.nin = 'Please verify your NIN before registering';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // For NIN, only allow digits and limit to 11 characters
        if (name === 'nin') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 11);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            
            // Reset verification status when NIN changes
            if (ninVerified && digitsOnly !== formData.nin) {
                setNinVerified(false);
                setNinVerificationData(null);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const verifyNIN = async () => {
        if (!validateNIN(formData.nin)) {
            toast.error('Please enter a valid 11-digit NIN');
            return;
        }

        setNinVerifying(true);
        
        try {
            // Call your Edge Function for NIN verification
            const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-nin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify({
                    nin: formData.nin
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setNinVerified(true);
                setNinVerificationData(data.data);
                toast.success('NIN verified successfully!');
                
                // Auto-fill name if it matches NIN data (optional)
                if (data.data.firstname && data.data.lastname && !formData.name) {
                    setFormData(prev => ({
                        ...prev,
                        name: `${data.data.firstname} ${data.data.lastname}`
                    }));
                }
            } else {
                throw new Error(data.message || 'NIN verification failed');
            }
        } catch (error) {
            console.error('NIN verification error:', error);
            toast.error(error.message || 'NIN verification failed');
            setNinVerified(false);
            setNinVerificationData(null);
        } finally {
            setNinVerifying(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the form errors');
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            toast.loading('Creating account...');

            const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    data: {
                        name: formData.name,
                        phone: formData.phone,
                        user_type: formData.userType,
                        ...(formData.userType === 'agent' && {
                            agency_name: formData.agencyName,
                            nin: formData.nin,
                            nin_verified: ninVerified,
                            nin_verification_data: ninVerificationData
                        })
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast.dismiss();
            toast.success('Account created successfully! Please check your email to verify.');
            navigate('/');

        } catch (error) {
            toast.dismiss();
            console.error('Registration error:', error);
            toast.error(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link
                    to="/signin"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    Back to Sign In
                </Link>

                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join thousands of real estate enthusiasts
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

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name *
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
                                        errors.name ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address *
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
                                        errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number *
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
                                        errors.phone ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        {/* Agent Fields (Only for Agents) */}
                        {formData.userType === 'agent' && (
                            <>
                                <div>
                                    <label htmlFor="agencyName" className="block text-sm font-medium text-gray-700">
                                        Agency Name *
                                    </label>
                                    <input
                                        id="agencyName"
                                        name="agencyName"
                                        type="text"
                                        value={formData.agencyName}
                                        onChange={handleInputChange}
                                        className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
                                            errors.agencyName ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your agency name"
                                    />
                                    {errors.agencyName && <p className="mt-1 text-sm text-red-600">{errors.agencyName}</p>}
                                </div>

                                {/* NIN Field */}
                                <div>
                                    <label htmlFor="nin" className="block text-sm font-medium text-gray-700">
                                        National Identification Number (NIN) *
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <IdentificationIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="nin"
                                            name="nin"
                                            type="text"
                                            value={formData.nin}
                                            onChange={handleInputChange}
                                            maxLength="11"
                                            className={`appearance-none block w-full pl-10 pr-12 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
                                                errors.nin ? 'border-red-300' : ninVerified ? 'border-green-300' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your 11-digit NIN"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            {ninVerified ? (
                                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                            ) : ninVerifying ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                            ) : (
                                                formData.nin.length === 11 && !ninVerified && (
                                                    <XCircleIcon className="h-5 w-5 text-red-500" />
                                                )
                                            )}
                                        </div>
                                    </div>
                                    {errors.nin && <p className="mt-1 text-sm text-red-600">{errors.nin}</p>}
                                    
                                    {/* NIN Verification Button */}
                                    {formData.nin.length === 11 && !ninVerified && (
                                        <button
                                            type="button"
                                            onClick={verifyNIN}
                                            disabled={ninVerifying}
                                            className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {ninVerifying ? 'Verifying NIN...' : 'Verify NIN'}
                                        </button>
                                    )}

                                    {/* NIN Verification Status */}
                                    {ninVerified && ninVerificationData && (
                                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                                            <div className="flex items-center">
                                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                                <span className="text-sm text-green-700 font-medium">NIN Verified</span>
                                            </div>
                                            <p className="text-sm text-green-600 mt-1">
                                                Verified: {ninVerificationData.firstname} {ninVerificationData.lastname}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`appearance-none block w-full pl-10 pr-12 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
                                        errors.password ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Create a password"
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
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password *
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`appearance-none block w-full pl-10 pr-12 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black ${
                                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading || (formData.userType === 'agent' && !ninVerified)}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;