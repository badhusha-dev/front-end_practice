import React from 'react';

// Loading spinner component
const Loading = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex justify-center items-center ${className}`} data-testid="loading-container">
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-primary-600 ${sizeClasses[size]}`} data-testid="loading-spinner"></div>
    </div>
  );
};

// Full page loading component
export const PageLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loading size="xl" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

// Inline loading component
export const InlineLoading = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Loading size="sm" />
      <span className="text-gray-600">{text}</span>
    </div>
  );
};

export default Loading;
