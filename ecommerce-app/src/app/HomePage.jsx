import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  MdStar,
  MdLocalShipping,
  MdSecurity,
  MdRefresh,
  MdArrowForward,
  MdShoppingBag,
  MdTrendingUp,
  MdPeople,
  MdEmojiEvents
} from 'react-icons/md';
import { FaArrowRight as ArrowRight, FaStar as Star } from 'react-icons/fa';
import { productsAPI } from '../api/api';
import ProductCard from '../features/products/ProductCard';
import Loading, { InlineLoading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorBoundary';
const ProductViewer3D = lazy(() => import('../components/3D/ProductViewer3D'));
const AnimatedBackground = lazy(() => import('../components/3D/AnimatedBackground'));
const ThreeDShowcase = lazy(() => import('../components/3D/ThreeDShowcase'));

const HomePage = () => {
  // Fetch featured products
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts
  } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productsAPI.getAll(),
    select: (response) => response.data.products.slice(0, 8), // Show only first 8 products
  });

  const featuredProducts = productsData || [];

  // Features data
  const features = [
    {
      icon: MdLocalShipping,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: MdSecurity,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: MdRefresh,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: MdEmojiEvents,
      title: 'Quality Products',
      description: 'Premium quality guaranteed'
    }
  ];

  // Stats data
  const stats = [
    { icon: MdShoppingBag, value: '10K+', label: 'Products Sold' },
    { icon: MdPeople, value: '5K+', label: 'Happy Customers' },
    { icon: MdTrendingUp, value: '99%', label: 'Customer Satisfaction' },
    { icon: MdEmojiEvents, value: '50+', label: 'Awards Won' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <Suspense fallback={null}>
          <AnimatedBackground className="absolute inset-0" />
        </Suspense>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to Our
                <span className="block text-yellow-300">E-commerce Store</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover amazing products at unbeatable prices. Shop with confidence 
                and enjoy fast, secure delivery to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/products"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
                >
                  Browse Products
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <Suspense fallback={null}>
                <ProductViewer3D className="w-full h-96 rounded-lg overflow-hidden" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Showcase Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Our 3D UI</h2>
          <Suspense fallback={null}>
            <ThreeDShowcase />
          </Suspense>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with 
              quality products and excellent service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out our most popular and trending products
            </p>
          </div>

          {productsLoading ? (
            <InlineLoading text="Loading featured products..." />
          ) : productsError ? (
            <ErrorMessage error={productsError} onRetry={refetchProducts} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our Success in Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their shopping needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Happy Customer',
                content: 'Amazing products and fast delivery! The quality exceeded my expectations.',
                rating: 5
              },
              {
                name: 'Mike Chen',
                role: 'Regular Buyer',
                content: 'Great customer service and easy returns. I shop here regularly now.',
                rating: 5
              },
              {
                name: 'Emily Davis',
                role: 'First-time Buyer',
                content: 'Smooth checkout process and secure payment. Will definitely order again.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing products at great prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Browse Products
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
