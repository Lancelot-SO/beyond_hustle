import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/hero/img1.png';

const Login = () => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please enter your details to sign in
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent transition duration-200"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent transition duration-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#D95B24] focus:ring-[#D95B24] border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-[#D95B24] hover:text-[#b84d1f] transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[#D95B24] hover:bg-[#b84d1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D95B24] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/launch" className="font-semibold text-[#D95B24] hover:text-[#b84d1f] transition-colors">
                            Launch your journey
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side: Image */}
            <div className="hidden lg:block lg:w-1/2 relative bg-[#1C2237] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C2237] via-[#2a3454] to-[#1C2237] opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-[#D95B24] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <img
                            src={img1}
                            alt="Beyond The Hustle Book Cover"
                            className="relative rounded-2xl shadow-2xl transform transition duration-700 group-hover:scale-[1.05] group-hover:-rotate-2 max-h-[85vh] object-contain"
                        />
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-24 h-24 border-4 border-[#D95B24] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-32 h-32 border-4 border-[#D95B24] rounded-full opacity-5 animate-bounce" style={{ animationDuration: '4s' }}></div>
            </div>
        </div>
    );
};

export default Login;
