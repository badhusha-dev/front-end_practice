import React, { useState } from 'react';
import { MdStar, MdThumbUp, MdReport, MdEdit, MdDelete, MdPerson } from 'react-icons/md';
import { useAuth } from '../hooks/reduxHooks';

const ProductReviews = ({ productId, productName }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    verified: false
  });

  const { user, isAuthenticated } = useAuth();
  
  // Mock data for reviews since social store is not implemented
  const reviews = [
    {
      id: 1,
      userId: 'user1',
      userName: 'John Doe',
      rating: 5,
      title: 'Great product!',
      comment: 'Really happy with this purchase. Quality is excellent.',
      date: '2024-01-15',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'Jane Smith',
      rating: 4,
      title: 'Good value',
      comment: 'Good product for the price. Would recommend.',
      date: '2024-01-10',
      verified: false,
      helpful: 8
    }
  ];
  
  const getProductRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };
  
  const getProductReviews = () => reviews;

  const productReviews = getProductReviews(productId);
  const rating = getProductRating(productId);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in to leave a review');
      return;
    }

    if (editingReview) {
      updateReview(editingReview.id, newReview);
      setEditingReview(null);
    } else {
      addReview(productId, {
        ...newReview,
        author: user.name || user.email,
        authorId: user.id,
        authorAvatar: user.avatar || null
      });
    }

    setNewReview({ rating: 5, title: '', comment: '', verified: false });
    setShowReviewForm(false);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      verified: review.verified
    });
    setShowReviewForm(true);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : "div"}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } transition-transform duration-150`}
          >
            <MdStar
              className={`w-5 h-5 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {renderStars(Math.floor(rating.average))}
              <span className="text-lg font-semibold">{rating.average}</span>
              <span className="text-gray-500">({rating.count} reviews)</span>
            </div>
          </div>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn-primary"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">
            {editingReview ? 'Edit Review' : 'Write a Review'}
          </h4>
          <form onSubmit={handleSubmitReview}>
            <div className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                {renderStars(newReview.rating, true, (rating) =>
                  setNewReview({ ...newReview, rating })
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Summarize your review"
                  required
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Share your experience with this product"
                  required
                />
              </div>

              {/* Verified Purchase */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={newReview.verified}
                  onChange={(e) => setNewReview({ ...newReview, verified: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="verified" className="text-sm text-gray-700">
                  I purchased this product
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setEditingReview(null);
                    setNewReview({ rating: 5, title: '', comment: '', verified: false });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {productReviews.length > 0 ? (
          productReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    {review.authorAvatar ? (
                      <img
                        src={review.authorAvatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <MdPerson className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{review.author}</h5>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Review Actions */}
                <div className="flex items-center space-x-2">
                  {user && user.id === review.authorId && (
                    <>
                      <button
                        onClick={() => handleEditReview(review)}
                        className="text-gray-500 hover:text-primary-600 transition-colors"
                        title="Edit review"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        title="Delete review"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => reportReview(review.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="Report review"
                  >
                    <MdReport className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <h6 className="font-semibold text-gray-900 mb-2">{review.title}</h6>
                <p className="text-gray-700">{review.comment}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(review.timestamp).toLocaleDateString()}</span>
                <button
                  onClick={() => markReviewHelpful(review.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <MdThumbUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <MdStar className="w-16 h-16 mx-auto" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h4>
            <p className="text-gray-600">Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
