import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative aspect-w-4 aspect-h-3 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-2">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-28 bg-gray-200 rounded" />
          </div>
          <div className="h-9 w-28 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;


