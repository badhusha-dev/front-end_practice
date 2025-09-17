import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../api/api';
import ProductCard from '../features/products/ProductCard';
import EnhancedProductCard from '../components/EnhancedProductCard';
import AIRecommendations from '../components/AIRecommendations';
import Loading from '../components/Loading';
import { ErrorMessage } from '../components/ErrorBoundary';
import { 
  MdStar, 
  MdLocalShipping, 
  MdSecurity, 
  MdTrendingUp,
  MdPeople,
  MdEmojiEvents,
  MdArrowForward,
  MdShoppingBag
} from 'react-icons/md';

const EnhancedHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fetch featured products
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError
  } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productsAPI.getFeaturedProducts(),
    staleTime: 5 * 60 * 1000,
  });

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Welcome to Our E-commerce Store",
      subtitle: "Discover amazing products with the best prices and quality guaranteed.",
      bg: "from-blue-600 to-purple-600",
      cta: "Shop Now"
    },
    {
      title: "Latest Tech Collection",
      subtitle: "Cutting-edge technology at unbeatable prices. Limited time offers!",
      bg: "from-purple-600 to-pink-600",
      cta: "Explore Tech"
    },
    {
      title: "Premium Quality Guaranteed",
      subtitle: "Every product comes with our 30-day money-back guarantee.",
      bg: "from-green-600 to-blue-600",
      cta: "Learn More"
    }
  ];

  const features = [
    {
      icon: <MdLocalShipping className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
      color: "blue"
    },
    {
      icon: <MdSecurity className="w-8 h-8" />,
      title: "Secure Payment",
      description: "Your payment information is safe",
      color: "green"
    },
    {
      icon: <MdStar className="w-8 h-8" />,
      title: "Quality Products",
      description: "Only the best products for you",
      color: "purple"
    },
    {
      icon: <MdTrendingUp className="w-8 h-8" />,
      title: "Best Prices",
      description: "Competitive pricing guaranteed",
      color: "orange"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "50K+", label: "Products Sold" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Hero Section */}
      <div className={`bg-gradient-to-r ${heroSlides[currentSlide].bg} text-white py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="space-x-4 animate-fade-in-delay-2">
            <Link 
              to="/products" 
              className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              {heroSlides[currentSlide].cta}
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 text-${feature.color}-600`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <Link 
              to="/products" 
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Products
              <MdArrowForward className="ml-2" />
            </Link>
          </div>
          
          {productsLoading ? (
            <Loading />
          ) : productsError ? (
            <ErrorMessage message="Failed to load featured products" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData?.slice(0, 8).map((product) => (
                <EnhancedProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AIRecommendations userId="1" />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get the latest deals and product updates delivered to your inbox</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers</p>
          <div className="space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              <MdShoppingBag className="mr-2" />
              Create Account
            </Link>
            <Link 
              to="/products" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHomePage;
