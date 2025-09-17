import React from 'react';
import { Link } from 'react-router-dom';
import { useComparison, useCart, useWishlist } from '../../hooks/reduxHooks';
import { addToCart } from '../cart/cartSlice';
import { removeFromComparison } from './comparisonSlice';
import { addToWishlist } from '../wishlist/wishlistSlice';
import { MdClose, MdShoppingCart, MdFavorite } from 'react-icons/md';

const ComparisonPage = () => {
  const { items, dispatch: comparisonDispatch } = useComparison();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();

  const handleAddToCart = (product) => {
    cartDispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    wishlistDispatch(addToWishlist(product));
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleRemoveItem = (product) => {
    comparisonDispatch(removeFromComparison(product.id));
    toast.success(`${product.name} removed from comparison!`);
  };

  const handleClearComparison = () => {
    if (window.confirm('Are you sure you want to clear the comparison?')) {
      comparisonDispatch({ type: 'comparison/clearComparison' });
      toast.success('Comparison cleared!');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          icon={MdClose}
          title="No products to compare"
          message="Add products to compare their features and specifications."
          action={
            <Link 
              to="/products" 
              className="btn-primary"
            >
              Browse Products
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Comparison</h1>
          <p className="text-gray-600 mt-2">
            Compare {items.length} product{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <button
          onClick={handleClearComparison}
          className="btn-danger"
        >
          Clear Comparison
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                {items.map((product) => (
                  <th key={product.id} className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[250px]">
                    <div className="relative">
                      <button
                        onClick={() => handleRemoveItem(product)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <MdClose className="w-3 h-3" />
                      </button>
                      
                      <div className="flex flex-col items-center space-y-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <h3 className="text-sm font-semibold text-gray-900 text-center line-clamp-2">
                          {product.name}
                        </h3>
                        <span className="text-lg font-bold text-primary-600">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {/* Rating */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Rating
                </td>
                {items.map((product) => (
                  <td key={product.id} className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-sm font-medium">{product.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <MdFavorite
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 fill-current'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Category
                </td>
                {items.map((product) => (
                  <td key={product.id} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {product.category}
                  </td>
                ))}
              </tr>

              {/* Stock */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Stock
                </td>
                {items.map((product) => (
                  <td key={product.id} className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.stock > 10 
                        ? 'bg-green-100 text-green-800' 
                        : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Features
                </td>
                {items.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    <div className="space-y-1">
                      {product.features?.slice(0, 3).map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1">
                          {feature}
                        </div>
                      ))}
                      {product.features?.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{product.features.length - 3} more
                        </div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Actions
                </td>
                {items.map((product) => (
                  <td key={product.id} className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn-primary text-xs px-3 py-1 flex items-center justify-center space-x-1"
                      >
                        <MdShoppingCart className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                      
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="btn-secondary text-xs px-3 py-1 flex items-center justify-center space-x-1"
                      >
                        <MdFavorite className="w-3 h-3" />
                        <span>Wishlist</span>
                      </button>
                      
                      <Link
                        to={`/products/${product.id}`}
                        className="text-xs text-primary-600 hover:text-primary-800 underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
