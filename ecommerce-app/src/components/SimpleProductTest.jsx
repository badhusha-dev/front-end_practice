import React, { useState, useEffect } from 'react';
import { productsAPI } from '../api/api';

const SimpleProductTest = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testProductAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Testing product API...');
      const response = await productsAPI.getById('1');
      console.log('API Response:', response);
      setProductData(response.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testProductAPI();
  }, []);

  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Product API Test</h2>
      
      <div className="space-y-3">
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>
        
        <div>
          <strong>Error:</strong> {error || 'None'}
        </div>
        
        <div>
          <strong>Product Data:</strong>
          <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-auto">
            {productData ? JSON.stringify(productData, null, 2) : 'No data'}
          </pre>
        </div>
        
        <button 
          onClick={testProductAPI}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test API Again
        </button>
      </div>
    </div>
  );
};

export default SimpleProductTest;
