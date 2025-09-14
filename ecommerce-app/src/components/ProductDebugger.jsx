import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../api/api';

const ProductDebugger = () => {
  const { id } = useParams();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['product-debug', id],
    queryFn: () => productsAPI.getById(id),
    enabled: !!id,
  });

  return (
    <div className="p-4 bg-gray-100 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">Product Debug Info</h3>
      <div className="space-y-2 text-sm">
        <p><strong>Product ID from URL:</strong> {id || 'No ID found'}</p>
        <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {error ? error.message : 'None'}</p>
        <p><strong>Data:</strong> {data ? JSON.stringify(data, null, 2) : 'No data'}</p>
        <p><strong>API URL:</strong> /api/products/{id}</p>
      </div>
    </div>
  );
};

export default ProductDebugger;
