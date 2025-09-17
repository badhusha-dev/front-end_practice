import React from 'react';
import { MdClose, MdCheck, MdClose as MdX, MdStar } from 'react-icons/md';
import { useComparison } from '../hooks/reduxHooks';

const ProductComparisonTable = ({ products, onRemoveProduct }) => {
  const { items: comparisonItems } = useComparison();

  if (comparisonItems.length < 2) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Add at least 2 products to compare</p>
      </div>
    );
  }

  const comparisonFields = [
    { key: 'name', label: 'Product Name', type: 'text' },
    { key: 'price', label: 'Price', type: 'currency' },
    { key: 'brand', label: 'Brand', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'stock', label: 'Stock', type: 'number' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'features', label: 'Key Features', type: 'list' },
    { key: 'warranty', label: 'Warranty', type: 'text' },
    { key: 'shipping', label: 'Shipping', type: 'text' }
  ];

  const renderFieldValue = (product, field) => {
    const value = product[field.key];
    
    switch (field.type) {
      case 'currency':
        return `$${value?.toFixed(2) || '0.00'}`;
      case 'rating':
        return (
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{value || 0}</span>
          </div>
        );
      case 'list':
        return Array.isArray(value) ? value.join(', ') : value || 'N/A';
      case 'number':
        return value || 0;
      default:
        return value || 'N/A';
    }
  };

  const getBestValue = (field, products) => {
    if (field.type === 'currency') {
      const prices = products.map(p => p[field.key] || 0);
      const minPrice = Math.min(...prices);
      return products.find(p => (p[field.key] || 0) === minPrice);
    }
    if (field.type === 'rating') {
      const ratings = products.map(p => p[field.key] || 0);
      const maxRating = Math.max(...ratings);
      return products.find(p => (p[field.key] || 0) === maxRating);
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Product Comparison</h2>
        <p className="text-sm text-gray-600">Compare {comparisonItems.length} products</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-48">
                Features
              </th>
              {comparisonItems.map((product, index) => (
                <th key={product.id} className="px-4 py-3 text-center text-sm font-medium text-gray-700 min-w-64 relative">
                  <div className="flex flex-col items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mb-2"
                    />
                    <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
                    >
                      <MdClose className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map((field, fieldIndex) => {
              const bestProduct = getBestValue(field, comparisonItems);
              
              return (
                <tr key={field.key} className={fieldIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
                    {field.label}
                  </td>
                  {comparisonItems.map((product) => {
                    const isBest = bestProduct && bestProduct.id === product.id;
                    const value = renderFieldValue(product, field);
                    
                    return (
                      <td key={product.id} className="px-4 py-3 text-center text-sm border-r last:border-r-0">
                        <div className={`flex items-center justify-center ${isBest ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                          {isBest && <MdCheck className="w-4 h-4 mr-1 text-green-500" />}
                          <span className={isBest ? 'text-green-600' : ''}>{value}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Comparison Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Best Price */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Best Price</h4>
            {(() => {
              const prices = comparisonItems.map(p => ({ product: p, price: p.price || 0 }));
              const bestPrice = prices.reduce((min, current) => 
                current.price < min.price ? current : min
              );
              return (
                <div className="text-green-600 font-semibold">
                  {bestPrice.product.name} - ${bestPrice.price.toFixed(2)}
                </div>
              );
            })()}
          </div>

          {/* Best Rating */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Best Rating</h4>
            {(() => {
              const ratings = comparisonItems.map(p => ({ product: p, rating: p.rating || 0 }));
              const bestRating = ratings.reduce((max, current) => 
                current.rating > max.rating ? current : max
              );
              return (
                <div className="text-blue-600 font-semibold">
                  {bestRating.product.name} - {bestRating.rating}★
                </div>
              );
            })()}
          </div>

          {/* Best Value */}
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Best Value</h4>
            {(() => {
              const values = comparisonItems.map(p => ({
                product: p,
                value: (p.rating || 0) / (p.price || 1)
              }));
              const bestValue = values.reduce((max, current) => 
                current.value > max.value ? current : max
              );
              return (
                <div className="text-purple-600 font-semibold">
                  {bestValue.product.name}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparisonTable;
