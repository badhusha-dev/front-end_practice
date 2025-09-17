import { useSelector, useDispatch } from 'react-redux';

// Auth hooks
export const useAuth = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    dispatch
  };
};

// Cart hooks
export const useCart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return {
    items: cart.items,
    total: cart.total,
    itemCount: cart.itemCount,
    dispatch
  };
};

// Wishlist hooks
export const useWishlist = () => {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  return {
    items: wishlist.items,
    dispatch
  };
};

// Comparison hooks
export const useComparison = () => {
  const comparison = useSelector(state => state.comparison);
  const dispatch = useDispatch();
  return {
    items: comparison.items,
    dispatch
  };
};

// Products hooks
export const useProducts = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  return {
    products: products.items || [],
    isLoading: products.isLoading,
    error: products.error,
    dispatch
  };
};

// Orders hooks
export const useOrders = () => {
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();
  return {
    orders: orders.items || [],
    isLoading: orders.isLoading,
    error: orders.error,
    dispatch
  };
};

// Reviews hooks
export const useReviews = () => {
  const reviews = useSelector(state => state.reviews);
  const dispatch = useDispatch();
  return {
    reviews: reviews.items || [],
    isLoading: reviews.isLoading,
    error: reviews.error,
    dispatch
  };
};