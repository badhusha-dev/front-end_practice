import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist, useCart } from '../../hooks/reduxHooks';
import { addToCart } from '../cart/cartSlice';
import { removeFromWishlist } from './wishlistSlice';
import { MdFavorite, MdShoppingCart, MdRemove, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ErrorMessage, EmptyState } from '../../components/ErrorBoundary';

const WishlistPage = () => {
  const { items, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  
  const itemCount = items.length;

  const handleMoveToCart = (product) => {
    cartDispatch(addToCart(product));
    wishlistDispatch(removeFromWishlist(product.id));
    toast.success(`${product.name} moved to cart!`);
  };

  const handleRemoveItem = (product) => {
    wishlistDispatch(removeFromWishlist(product.id));
    toast.success(`${product.name} removed from wishlist!`);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      wishlistDispatch({ type: 'wishlist/clearWishlist' });
      toast.success('Wishlist cleared!');
    }
  };

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          icon={MdFavorite}
          title="Your wishlist is empty"
          message="Start adding products you love to your wishlist!"
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
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>
        
        <button
          onClick={handleClearWishlist}
          className="btn-danger flex items-center space-x-2"
        >
          <MdDelete className="w-4 h-4" />
          <span>Clear Wishlist</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <Link to={`/products/${product.id}`} className="block">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveItem(product);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <MdFavorite className="w-4 h-4 text-red-500 fill-current" />
                </button>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center mt-2 space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <MdFavorite
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 fill-current'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="btn-primary flex items-center space-x-1 text-sm px-3 py-2"
                  >
                    <MdShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemoveItem(product)}
                    className="btn-secondary flex items-center space-x-1 text-sm px-3 py-2"
                  >
                    <MdRemove className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
