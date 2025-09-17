import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MdFavorite, 
  MdFavoriteBorder, 
  MdShoppingCart, 
  MdCompare, 
  MdVisibility,
  MdStar,
  MdLocalShipping,
  MdFlashOn
} from 'react-icons/md';
import { useCart, useWishlist, useComparison } from '../hooks/reduxHooks';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addToComparison, removeFromComparison } from '../features/comparison/comparisonSlice';

const EnhancedProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  // Redux hooks
  const { dispatch: cartDispatch, items: cartItems } = useCart();
  const { dispatch: wishlistDispatch, items: wishlistItems } = useWishlist();
  const { dispatch: comparisonDispatch, items: comparisonItems } = useComparison();
  
  // Helper functions
  const isInCart = cartItems.some(item => item.id === product.id);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isInComparison = comparisonItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    cartDispatch(addToCart(product));
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      wishlistDispatch(removeFromWishlist(product.id));
    } else {
      wishlistDispatch(addToWishlist(product));
    }
  };

  const handleCompareToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInComparison) {
      comparisonDispatch(removeFromComparison(product.id));
    } else {
      comparisonDispatch(addToComparison(product));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <MdStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice && product.price < product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return null;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div
      className="product-card group relative"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowQuickActions(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickActions(false);
      }}
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-48 object-cover transition-transform duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          
          {/* Overlay with Quick Actions */}
          <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${
            showQuickActions ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-2">
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isInWishlist(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
                title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isInWishlist(product.id) ? (
                  <MdFavorite className="w-5 h-5" />
                ) : (
                  <MdFavoriteBorder className="w-5 h-5" />
                )}
              </button>
              
              <button
                onClick={handleCompareToggle}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isInComparison(product.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-500 hover:text-white'
                }`}
                title="Add to comparison"
              >
                <MdCompare className="w-5 h-5" />
              </button>
              
              <button
                className="p-2 bg-white text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title="Quick view"
              >
                <MdVisibility className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {discountPercentage && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                -{discountPercentage}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Featured
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Only {product.stock} left
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </div>
          
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews || 0})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            {/* Shipping Info */}
            {product.freeShipping && (
              <div className="flex items-center text-green-600 text-xs">
                <MdLocalShipping className="w-3 h-3 mr-1" />
                Free
              </div>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isInCart(product.id)}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isInCart(product.id)
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
            }`}
          >
            {product.stock === 0 ? (
              <>
                <span>Out of Stock</span>
              </>
            ) : isInCart(product.id) ? (
              <>
                <MdFlashOn className="w-4 h-4" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <MdShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default EnhancedProductCard;
