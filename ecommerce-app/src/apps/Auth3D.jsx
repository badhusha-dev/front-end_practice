import React, { Suspense, lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAsync, registerAsync } from '../features/auth/authSlice';
import { 
  MdEmail, 
  MdLock, 
  MdPerson, 
  MdVisibility, 
  MdVisibilityOff,
  MdLogin,
  MdPersonAdd
} from 'react-icons/md';

// Lazy load 3D components
const AnimatedBackground = lazy(() => import('../components/3D/AnimatedBackground'));
const PageTransition3D = lazy(() => import('../components/3D/PageTransition3D'));
const InteractiveLogo = lazy(() => import('../components/3D/InteractiveLogo'));
const Loading3D = lazy(() => import('../components/3D/Loading3D'));

// 3D Authentication Form Component
const AuthForm3D = ({ mode, onToggleMode, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <AnimatedBackground className="absolute inset-0 opacity-30" />
      </Suspense>

      {/* 3D Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<div className="w-16 h-16 bg-white rounded-full mx-auto mb-8 animate-pulse" />}>
          <PageTransition3D isActive={false}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <InteractiveLogo className="w-16 h-16 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600">
                  {mode === 'login' 
                    ? 'Sign in to your account' 
                    : 'Join our 3D shopping experience'
                  }
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields (Register only) */}
                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="John"
                          required={mode === 'register'}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Doe"
                          required={mode === 'register'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <MdVisibilityOff className="w-5 h-5" /> : <MdVisibility className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <Suspense fallback={<div className="w-5 h-5 bg-white rounded-full animate-pulse" />}>
                      <Loading3D type="spinner" />
                    </Suspense>
                  ) : (
                    <>
                      {mode === 'login' ? <MdLogin className="w-5 h-5" /> : <MdPersonAdd className="w-5 h-5" />}
                      <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  onClick={onToggleMode}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  {mode === 'login' ? 'Create Account' : 'Sign In'}
                </button>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h3>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Admin:</strong> admin@example.com / admin123</p>
                  <p><strong>User:</strong> user@example.com / user123</p>
                </div>
              </div>
            </div>
          </PageTransition3D>
        </Suspense>
      </div>
    </div>
  );
};

// Main Authentication Component
const Auth3D = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await dispatch(loginAsync({
          email: formData.email,
          password: formData.password
        })).unwrap();
      } else {
        await dispatch(registerAsync({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        })).unwrap();
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null);
  };

  return (
    <AuthForm3D
      mode={mode}
      onToggleMode={toggleMode}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default Auth3D;
