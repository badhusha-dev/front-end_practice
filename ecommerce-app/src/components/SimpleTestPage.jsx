import React from 'react';

const SimpleTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 E-commerce App is Working!
        </h1>
        <p className="text-gray-600 mb-6">
          Your React app is running successfully on Vite.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>✅ React is loaded</p>
          <p>✅ Tailwind CSS is working</p>
          <p>✅ Routing is functional</p>
          <p>✅ Build process is successful</p>
        </div>
        <div className="mt-6">
          <a 
            href="/products" 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleTestPage;
