import React, { useState } from 'react';
import { 
  MdShoppingCart, 
  MdLocalShipping, 
  MdSecurity, 
  MdRedeem, 
  MdRemoveShoppingCart,
  MdAdd,
  MdRemove,
  MdDelete,
  MdCheckCircle,
  MdCardGiftcard
} from 'react-icons/md';
import { useCart } from '../hooks/reduxHooks';
import { updateCartItemQuantity, removeFromCart, clearCart } from '../features/cart/cartSlice';

const AdvancedCartFeatures = () => {
  const { items, total, itemCount, dispatch } = useCart();
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [showCouponForm, setShowCouponForm] = useState(false);

  // Mock coupon data
  const availableCoupons = [
    { code: 'SAVE10', discount: 10, type: 'percentage', minOrder: 50 },
    { code: 'FREESHIP', discount: 0, type: 'shipping', minOrder: 25 },
    { code: 'WELCOME20', discount: 20, type: 'percentage', minOrder: 100 }
  ];

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon && !appliedCoupons.find(c => c.code === coupon.code)) {
      if (total >= coupon.minOrder) {
        setAppliedCoupons([...appliedCoupons, coupon]);
        setCouponCode('');
        setShowCouponForm(false);
      } else {
        alert(`Minimum order amount of $${coupon.minOrder} required for this coupon`);
      }
    } else {
      alert('Invalid coupon code or already applied');
    }
  };

  const removeCoupon = (couponCode) => {
    setAppliedCoupons(appliedCoupons.filter(c => c.code !== couponCode));
  };

  const calculateDiscount = () => {
    let discount = 0;
    appliedCoupons.forEach(coupon => {
      if (coupon.type === 'percentage') {
        discount += (total * coupon.discount) / 100;
      } else if (coupon.type === 'fixed') {
        discount += coupon.discount;
      }
    });
    return discount;
  };

  const calculateShipping = () => {
    const freeShippingCoupon = appliedCoupons.find(c => c.type === 'shipping');
    if (freeShippingCoupon) return 0;
    return total > 50 ? 0 : 9.99;
  };

  const finalTotal = total - calculateDiscount() + calculateShipping();

  if (itemCount === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <MdRemoveShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <button className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <MdShoppingCart className="w-6 h-6 mr-2" />
              Shopping Cart ({itemCount} items)
            </h2>
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 text-sm flex items-center"
            >
              <MdDelete className="w-4 h-4 mr-1" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-6 flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm text-gray-600">{item.rating || 0}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <MdRemove className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-2 text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <MdAdd className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MdRedeem className="w-5 h-5 mr-2" />
          Coupons & Discounts
        </h3>
        
        {appliedCoupons.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Applied Coupons:</h4>
            {appliedCoupons.map((coupon, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg mb-2">
                <div className="flex items-center">
                  <MdCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-800">{coupon.code}</span>
                  <span className="text-sm text-green-600 ml-2">
                    {coupon.type === 'percentage' ? `${coupon.discount}% off` : 
                     coupon.type === 'shipping' ? 'Free Shipping' : 
                     `$${coupon.discount} off`}
                  </span>
                </div>
                <button
                  onClick={() => removeCoupon(coupon.code)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {!showCouponForm ? (
          <button
            onClick={() => setShowCouponForm(true)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <MdCardGiftcard className="w-4 h-4 mr-1" />
            Have a coupon code?
          </button>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply
            </button>
            <button
              onClick={() => setShowCouponForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          
          {calculateDiscount() > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${calculateDiscount().toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600 flex items-center">
              <MdLocalShipping className="w-4 h-4 mr-1" />
              Shipping
            </span>
            <span className="font-medium">
              {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
            </span>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full btn-primary text-lg py-3">
            Proceed to Checkout
          </button>
          
          <div className="flex items-center justify-center text-sm text-gray-500">
            <MdSecurity className="w-4 h-4 mr-1" />
            Secure checkout with SSL encryption
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <MdLocalShipping className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-800">Free Shipping</h4>
            <p className="text-sm text-gray-600">On orders over $50</p>
          </div>
          <div className="flex flex-col items-center">
            <MdSecurity className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-800">Secure Payment</h4>
            <p className="text-sm text-gray-600">SSL encrypted checkout</p>
          </div>
          <div className="flex flex-col items-center">
            <MdCardGiftcard className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-800">Easy Returns</h4>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCartFeatures;
