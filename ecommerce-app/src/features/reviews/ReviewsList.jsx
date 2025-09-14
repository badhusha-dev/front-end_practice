import React, { useState } from 'react';
import { MdStar, MdThumbUp, MdFlag, MdMoreVert } from 'react-icons/md';
import { useReviewsStore } from './reviewsStore';
import { useAuthStore } from '../auth/authStore';
import { toast } from 'react-toastify';

const ReviewsList = ({ productId }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [expandedReview, setExpandedReview] = useState(null);

  const { getReviews, getAverageRating, getRatingDistribution, markHelpful, reportReview, deleteReview } = useReviewsStore();
  const { user, isAdmin } = useAuthStore();

  const reviews = getReviews(productId);
  const averageRating = getAverageRating(productId);
  const ratingDistribution = getRatingDistribution(productId);
  const totalReviews = reviews.length;

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'mostHelpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Filter reviews by rating
  const filteredReviews = sortedReviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating === parseInt(filterRating);
  });

  const handleMarkHelpful = (reviewId) => {
    if (!user) {
      toast.error('Please log in to mark reviews as helpful');
      return;
    }

    markHelpful(productId, reviewId, user.id);
    toast.success('Review marked as helpful!');
  };

  const handleReportReview = (reviewId) => {
    if (!user) {
      toast.error('Please log in to report reviews');
      return;
    }

    if (window.confirm('Are you sure you want to report this review?')) {
      reportReview(productId, reviewId);
      toast.success('Review reported successfully');
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(productId, reviewId);
      toast.success('Review deleted successfully');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <MdStar
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderRatingBar = (starValue, count) => {
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    
    return (
      <div key={starValue} className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 w-2">{starValue}</span>
        <MdStar className="w-3 h-3 text-yellow-400 fill-current" />
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 w-8">{count}</span>
      </div>
    );
  };

  if (totalReviews === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start space-x-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
            <div className="flex justify-center mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-sm text-gray-600 mt-1">{totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map(starValue => 
              renderRatingBar(starValue, ratingDistribution[starValue])
            )}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="mostHelpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <h4 className="font-semibold text-gray-900">{review.title}</h4>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="font-medium text-gray-900">{review.userName}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {expandedReview === review.id 
                    ? review.comment
                    : review.comment.length > 200
                    ? `${review.comment.substring(0, 200)}...`
                    : review.comment
                  }
                </p>

                {review.comment.length > 200 && (
                  <button
                    onClick={() => setExpandedReview(
                      expandedReview === review.id ? null : review.id
                    )}
                    className="text-primary-600 hover:text-primary-800 text-sm mt-1"
                  >
                    {expandedReview === review.id ? 'Show less' : 'Read more'}
                  </button>
                )}

                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => handleMarkHelpful(review.id)}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <MdThumbUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>

                  <button
                    onClick={() => handleReportReview(review.id)}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600"
                  >
                    <MdFlag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>

              {/* Admin/Author Actions */}
              {(isAdmin() || (user && user.id === review.userId)) && (
                <div className="relative">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MdMoreVert className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews match your current filter.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
