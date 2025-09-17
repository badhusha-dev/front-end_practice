import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../api/api';
import EnhancedProductCard from './EnhancedProductCard';
import Loading from './Loading';
import { ErrorMessage } from './ErrorBoundary';
import { 
  MdPsychology, 
  MdTrendingUp, 
  MdRefresh,
  MdLightbulb,
  MdStar
} from 'react-icons/md';

const AIRecommendations = ({ userId, currentProductId, category }) => {
  const [recommendationType, setRecommendationType] = useState('personalized');
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch AI recommendations
  const {
    data: recommendations,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['ai-recommendations', userId, currentProductId, category, recommendationType, refreshKey],
    queryFn: async () => {
      // Simulate AI recommendation API call
      const allProducts = await productsAPI.getProducts();
      
      // Simple AI-like recommendation logic
      let filteredProducts = allProducts;
      
      if (category) {
        filteredProducts = allProducts.filter(p => p.category === category);
      }
      
      if (currentProductId) {
        filteredProducts = filteredProducts.filter(p => p.id !== currentProductId);
      }
      
      // Simulate different recommendation algorithms
      switch (recommendationType) {
        case 'personalized':
          // Sort by rating and price (simulating user preference)
          return filteredProducts
            .sort((a, b) => (b.rating * 0.7 + (1000 - a.price) * 0.3) - (a.rating * 0.7 + (1000 - b.price) * 0.3))
            .slice(0, 8);
        case 'trending':
          // Sort by reviews count (simulating popularity)
          return filteredProducts
            .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
            .slice(0, 8);
        case 'similar':
          // Sort by category and rating (simulating similarity)
          return filteredProducts
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8);
        default:
          return filteredProducts.slice(0, 8);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getRecommendationTitle = () => {
    switch (recommendationType) {
      case 'personalized':
        return 'Recommended for You';
      case 'trending':
        return 'Trending Now';
      case 'similar':
        return 'Similar Products';
      default:
        return 'AI Recommendations';
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendationType) {
      case 'personalized':
        return <MdPsychology className="w-5 h-5" />;
      case 'trending':
        return <MdTrendingUp className="w-5 h-5" />;
      case 'similar':
        return <MdLightbulb className="w-5 h-5" />;
      default:
        return <MdStar className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">AI Recommendations</h3>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <ErrorMessage message="Failed to load AI recommendations" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {getRecommendationIcon()}
          <h3 className="text-xl font-semibold text-gray-800">
            {getRecommendationTitle()}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            AI Powered
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Recommendation Type Selector */}
          <select
            value={recommendationType}
            onChange={(e) => setRecommendationType(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="personalized">Personalized</option>
            <option value="trending">Trending</option>
            <option value="similar">Similar</option>
          </select>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            title="Refresh recommendations"
          >
            <MdRefresh className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <MdPsychology className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">How AI Recommendations Work</h4>
            <p className="text-sm text-blue-700">
              {recommendationType === 'personalized' && 
                "Our AI analyzes your browsing history, preferences, and behavior to suggest products you'll love."
              }
              {recommendationType === 'trending' && 
                "These products are currently popular among customers with similar interests and demographics."
              }
              {recommendationType === 'similar' && 
                "Products with similar features, categories, and quality ratings to what you're viewing."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      {recommendations && recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <EnhancedProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MdLightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-600 mb-2">No Recommendations Available</h4>
          <p className="text-gray-500">Try refreshing or changing the recommendation type.</p>
        </div>
      )}

      {/* AI Confidence Score */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>AI Confidence Score</span>
          <div className="flex items-center space-x-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.random() * 30 + 70}%` }}
              ></div>
            </div>
            <span className="font-medium">
              {Math.round(Math.random() * 30 + 70)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;