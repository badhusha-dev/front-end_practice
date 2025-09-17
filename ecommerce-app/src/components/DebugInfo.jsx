import React from 'react';
import { useAuth } from '../hooks/reduxHooks';

const DebugInfo = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-sm z-50">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>User: {user ? `${user.firstName} ${user.lastName}` : 'None'}</div>
      <div>Role: {user?.role || 'None'}</div>
      <div>Current URL: {window.location.pathname}</div>
    </div>
  );
};

export default DebugInfo;
