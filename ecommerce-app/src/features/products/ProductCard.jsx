import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MdStar, MdShoppingCart, MdVisibility, MdFavorite, MdFavoriteBorder, MdCompare, MdCompareArrows, Md3dRotation } from 'react-icons/md';
import { useCart, useWishlist, useComparison } from '../../hooks/reduxHooks';
import { addToCart } from '../cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../wishlist/wishlistSlice';
import { addToComparison } from '../comparison/comparisonSlice';
import { useRecommendationStore } from '../ai/recommendationStore';
import { useGamificationStore } from '../gamification/gamificationStore';
const ARProductViewer = lazy(() => import('../../components/AR/ARProductViewer'));
const SocialShare = lazy(() => import('../../components/SocialShare'));
import { toast } from 'react-toastify';

// Product card component for displaying products in grid
const ProductCard = React.memo(({ product }) => {
  const [showAR, setShowAR] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const { dispatch: cartDispatch, items: cartItems } = useCart();
  const { dispatch: wishlistDispatch, items: wishlistItems } = useWishlist();
  const { dispatch: comparisonDispatch, items: comparisonItems } = useComparison();
  
  // Helper functions
  const isInCart = cartItems.some(item => item.id === product.id);
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isInComparison = comparisonItems.some(item => item.id === product.id);
  const isFull = comparisonItems.length >= 4;
  const { trackProductView, trackProductClick } = useRecommendationStore();
  const { addPoints } = useGamificationStore();

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    cartDispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  }, [cartDispatch, product]);

  const handleWishlistToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  }, [addToWishlist, isInWishlist, product, removeFromWishlist]);

  const handleComparisonToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
      toast.success(`${product.name} removed from comparison!`);
    } else {
      if (isFull()) {
        toast.error('You can compare up to 4 products at a time!');
        return;
      }
      addToComparison(product);
      toast.success(`${product.name} added to comparison!`);
    }
  }, [addToComparison, isFull, isInComparison, product, removeFromComparison]);

  const handleHoverViewTrack = useCallback(() => {
    if (!hasTrackedView) {
      trackProductView(product.id);
      setHasTrackedView(true);
    }
  }, [hasTrackedView, product.id, trackProductView]);

  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);

  // Memoized star rating display
  const ratingStars = useMemo(() => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4" aria-hidden="true">
          <MdStar className="w-4 h-4 text-gray-300 fill-current" />
          <div className="absolute inset-0 w-2 h-4 overflow-hidden">
            <MdStar className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<MdStar key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" />);
    }

    return stars;
  }, [product.rating]);

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/products/${product.id}`} className="block" onMouseEnter={handleHoverViewTrack}>
        {/* Product Image */}
        <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
          <img
            src={product.image}
            alt={`${product.name} - ${product.category}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            width="400"
            height="300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Quick view"
              >
                <MdVisibility className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stock Badge */}
          {product.stock < 10 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Low Stock
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-2 left-2 flex flex-col space-y-2">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={inWishlist}
            >
              {inWishlist ? (
                <MdFavorite className="w-4 h-4 text-red-500 fill-current" />
              ) : (
                <MdFavoriteBorder className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {/* Comparison Button */}
            <button
              onClick={handleComparisonToggle}
              className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
                inComparison 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              title={inComparison ? 'Remove from comparison' : 'Add to comparison'}
              aria-label={inComparison ? 'Remove from comparison' : 'Add to comparison'}
              aria-pressed={inComparison}
            >
              {inComparison ? (
                <MdCompare className="w-4 h-4" />
              ) : (
                <MdCompareArrows className="w-4 h-4" />
              )}
            </button>

            {/* AR Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowAR(true);
                trackProductClick(product.id, 'ar_view');
                addPoints('browse');
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              title="View in AR"
              aria-label="View in AR"
            >
              <Md3dRotation className="w-4 h-4 text-purple-600" />
            </button>
          </div>

          {/* Social Share Button */}
          <div className="absolute top-2 right-2">
            <Suspense fallback={null}>
              <SocialShare product={product} size="sm" />
            </Suspense>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mt-3 space-x-1">
            <div className="flex items-center">
              {ratingStars}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.stock > 0 && (
                <span className="text-sm text-green-600">
                  In Stock ({product.stock})
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : inCart
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <MdShoppingCart className="w-4 h-4" />
              <span>
                {product.stock === 0
                  ? 'Out of Stock'
                  : inCart
                  ? `In Cart (${quantity})`
                  : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>
      </Link>

      {/* AR Viewer Modal */}
      {showAR && (
        <Suspense fallback={null}>
          <ARProductViewer
            product={product}
            isOpen={showAR}
            onClose={() => setShowAR(false)}
          />
        </Suspense>
      )}
    </div>
  );
});

export default ProductCard;
