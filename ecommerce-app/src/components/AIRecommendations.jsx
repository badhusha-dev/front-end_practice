import React, { useState, useEffect } from 'react';
import { MdAutoAwesome, MdTrendingUp, MdThumbUp, MdShoppingBag } from 'react-icons/md';
import { useRecommendationStore } from '../features/ai/recommendationStore';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../api/api';
import ProductCard from '../features/products/ProductCard';
import Loading from './Loading';

const AIRecommendations = ({ productId = null, title = "Recommended for You", maxItems = 8 }) => {
  const [recommendationType, setRecommendationType] = useState('personalized');
  const { 
    recommendations, 
    generatePersonalizedRecommendations,
    generateTrendingRecommendations,
    getSimilarProducts,
    aiModel,
    trackProductClick
  } = useRecommendationStore();

  // Fetch all products for AI processing
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => productsAPI.getAll(),
    select: (response) => response.data?.products || [],
  });

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Generate recommendations when products are loaded
      generatePersonalizedRecommendations(allProducts);
      generateTrendingRecommendations(allProducts);
      
      if (productId) {
        getSimilarProducts(productId, allProducts);
      }
    }
  }, [allProducts, productId, generatePersonalizedRecommendations, generateTrendingRecommendations, getSimilarProducts]);

  const getCurrentRecommendations = () => {
    switch (recommendationType) {
      case 'personalized':
        return recommendations.personalized;
      case 'trending':
        return recommendations.trending;
      case 'similar':
        return recommendations.similar;
      default:
        return recommendations.personalized;
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendationType) {
      case 'personalized':
        return <MdAutoAwesome className="w-5 h-5" />;
      case 'trending':
        return <MdTrendingUp className="w-5 h-5" />;
      case 'similar':
        return <MdThumbUp className="w-5 h-5" />;
      default:
        return <MdAutoAwesome className="w-5 h-5" />;
    }
  };

  const getRecommendationTitle = () => {
    switch (recommendationType) {
      case 'personalized':
        return "Recommended for You";
      case 'trending':
        return "Trending Now";
      case 'similar':
        return "Similar Products";
      default:
        return "Recommended for You";
    }
  };

  const handleProductClick = (product) => {
    trackProductClick(product.id, 'recommendation');
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-32">
          <Loading size="lg" />
        </div>
      </div>
    );
  }

  const currentRecommendations = getCurrentRecommendations();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {getRecommendationIcon()}
          <h2 className="text-2xl font-bold text-gray-900">
            {getRecommendationTitle()}
          </h2>
          {aiModel.confidence > 0 && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              AI Confidence: {Math.round(aiModel.confidence * 100)}%
            </span>
          )}
        </div>

        {/* Recommendation Type Selector */}
        <div className="flex space-x-2">
          <button
            onClick={() => setRecommendationType('personalized')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              recommendationType === 'personalized'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Personalized
          </button>
          <button
            onClick={() => setRecommendationType('trending')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              recommendationType === 'trending'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Trending
          </button>
          {productId && (
            <button
              onClick={() => setRecommendationType('similar')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                recommendationType === 'similar'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Similar
            </button>
          )}
        </div>
      </div>

      {/* AI Insights */}
      {recommendationType === 'personalized' && aiModel.confidence > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <MdAutoAwesome className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">AI Insights</span>
          </div>
          <p className="text-sm text-blue-700">
            Based on your browsing history, purchases, and preferences, our AI has found products you might love.
          </p>
          {aiModel.lastUpdated && (
            <p className="text-xs text-blue-600 mt-1">
              Last updated: {new Date(aiModel.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {/* Recommendations Grid */}
      {currentRecommendations && currentRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentRecommendations.slice(0, maxItems).map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)}>
              <ProductCard product={product} />
              
              {/* Recommendation Badge */}
              {product.reason && (
                <div className="mt-2 text-xs text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-100 text-primary-800">
                    <MdThumbUp className="w-3 h-3 mr-1" />
                    {product.reason}
                  </span>
                </div>
              )}
              
              {/* Confidence Score */}
              {product.recommendationScore && (
                <div className="mt-1 text-xs text-center text-gray-500">
                  Match: {Math.round(product.recommendationScore * 100)}%
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MdShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations yet</h3>
          <p className="text-gray-600">
            Start browsing products to get personalized recommendations!
          </p>
        </div>
      )}

      {/* Footer */}
      {currentRecommendations && currentRecommendations.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {currentRecommendations.slice(0, maxItems).length} of {currentRecommendations.length} recommendations
            </span>
            <span>
              Powered by AI • Updated {aiModel.lastUpdated ? new Date(aiModel.lastUpdated).toLocaleTimeString() : 'just now'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
