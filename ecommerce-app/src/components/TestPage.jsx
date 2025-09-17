import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/reduxHooks';
import SimpleProductTest from './SimpleProductTest';

const TestPage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Authentication Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>User: {user ? `${user.firstName} ${user.lastName}` : 'None'}</p>
          <p>Role: {user?.role || 'None'}</p>
        </div>

        {/* Navigation Links */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Navigation Links</h2>
          <div className="space-y-2">
            <Link to="/products" className="block text-blue-600 hover:underline">
              Products Page
            </Link>
            <Link to="/cart" className="block text-blue-600 hover:underline">
              Cart Page
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="block text-blue-600 hover:underline">
                Admin Dashboard
              </Link>
            )}
            <Link to="/3d-showcase" className="block text-blue-600 hover:underline">
              3D Features Showcase
            </Link>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-2">
            <button 
              onClick={() => console.log('Auth state:', { user, isAuthenticated })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Log Auth State to Console
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Reload Page
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="text-sm space-y-2">
            <p>1. Check if you're logged in</p>
            <p>2. Try accessing Products page</p>
            <p>3. If admin, try Admin dashboard</p>
            <p>4. Check browser console for errors</p>
          </div>
        </div>

        {/* Product API Test */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
          <h2 className="text-xl font-semibold mb-4">Product API Test</h2>
          <SimpleProductTest />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
