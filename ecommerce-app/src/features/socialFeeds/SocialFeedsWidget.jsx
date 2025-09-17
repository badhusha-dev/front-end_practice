import React, { useState, useEffect } from 'react';
import { useSocialFeedsStore } from './socialFeedsStore';
import { 
  MdHome, 
  MdExplore, 
  MdTrendingUp, 
  MdCategory,
  MdFavorite,
  MdFavoriteBorder,
  MdBookmark,
  MdBookmarkBorder,
  MdShare,
  MdComment,
  MdMoreVert,
  MdAdd,
  MdSearch,
  MdPerson,
  MdVerified,
  MdLocationOn,
  MdTag,
  MdShoppingCart,
  MdStar,
  MdClose,
  MdSend,
  MdImage,
  MdEmojiEmotions
} from 'react-icons/md';
import { FiHeart, FiMessageCircle, FiShare2, FiUserPlus, FiUserMinus } from 'react-icons/fi';

const SocialFeedsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newPost, setNewPost] = useState({
    text: '',
    images: [],
    hashtags: [],
    products: []
  });
  
  const {
    posts,
    currentFeed,
    userProfile,
    likedPosts,
    savedPosts,
    followedUsers,
    followedBrands,
    initializeFeeds,
    setCurrentFeed,
    likePost,
    savePost,
    sharePost,
    followUser,
    followBrand,
    createPost,
    addComment,
    getTrendingHashtags,
    getSuggestedUsers,
    getFeedAnalytics
  } = useSocialFeedsStore();

  const trendingHashtags = getTrendingHashtags();
  const suggestedUsers = getSuggestedUsers();
  const analytics = getFeedAnalytics();

  useEffect(() => {
    if (isOpen) {
      initializeFeeds();
    }
  }, [isOpen, initializeFeeds]);

  const handleLike = (postId) => {
    likePost(postId);
  };

  const handleSave = (postId) => {
    savePost(postId);
  };

  const handleShare = (postId) => {
    sharePost(postId);
  };

  const handleFollow = (userId, isBrand = false) => {
    if (isBrand) {
      followBrand(userId);
    } else {
      followUser(userId);
    }
  };

  const handleAddComment = (postId) => {
    if (newComment.trim()) {
      addComment(postId, newComment);
      setNewComment('');
    }
  };

  const handleCreatePost = () => {
    if (newPost.text.trim()) {
      createPost(newPost);
      setNewPost({ text: '', images: [], hashtags: [], products: [] });
      setShowCreatePost(false);
    }
  };

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-20 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-600 to-red-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <MdExplore className="w-6 h-6" />
          <span className="hidden sm:block font-medium">Social Feed</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <MdExplore className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Social Feed</h2>
              <p className="text-sm text-pink-100">Discover products through community</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreatePost(true)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Create Post"
            >
              <MdAdd className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'discover', label: 'Discover', icon: MdExplore },
              { id: 'following', label: 'Following', icon: MdHome },
              { id: 'trending', label: 'Trending', icon: MdTrendingUp },
              { id: 'categories', label: 'Categories', icon: MdCategory }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentFeed(tab.id);
                }}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Feed */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.user.avatar}
                        alt={post.user.displayName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-1">
                          <h3 className="font-semibold text-gray-900">{post.user.displayName}</h3>
                          {post.user.verified && (
                            <MdVerified className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">@{post.user.username}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{formatTime(post.timestamp)}</span>
                          {post.location && (
                            <>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <MdLocationOn className="w-3 h-3" />
                                <span>{post.location}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {post.user.id !== userProfile.id && (
                        <button
                          onClick={() => handleFollow(post.user.id, post.user.id.startsWith('brand'))}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            followedUsers.includes(post.user.id) || followedBrands.includes(post.user.id)
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-pink-600 text-white hover:bg-pink-700'
                          }`}
                        >
                          {followedUsers.includes(post.user.id) || followedBrands.includes(post.user.id) ? (
                            <>
                              <FiUserMinus className="w-3 h-3 mr-1" />
                              Following
                            </>
                          ) : (
                            <>
                              <FiUserPlus className="w-3 h-3 mr-1" />
                              Follow
                            </>
                          )}
                        </button>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MdMoreVert className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-900 mb-3">{post.content.text}</p>
                    
                    {/* Images */}
                    {post.content.images && post.content.images.length > 0 && (
                      <div className={`grid gap-2 mb-3 ${
                        post.content.images.length === 1 ? 'grid-cols-1' :
                        post.content.images.length === 2 ? 'grid-cols-2' :
                        'grid-cols-2'
                      }`}>
                        {post.content.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    {/* Product Cards */}
                    {post.content.product && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.content.product.image}
                            alt={post.content.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{post.content.product.name}</h4>
                            <p className="text-sm text-gray-600">{post.content.product.brand}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-lg font-bold text-gray-900">${post.content.product.price}</span>
                              {post.content.product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${post.content.product.originalPrice}
                                </span>
                              )}
                              {post.content.product.discount && (
                                <span className="text-sm text-green-600 font-medium">
                                  {post.content.product.discount}% off
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <MdStar
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(post.content.product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    fill={i < Math.floor(post.content.product.rating) ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {post.content.product.rating} ({formatNumber(post.content.product.reviews)} reviews)
                              </span>
                            </div>
                          </div>
                          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                            <MdShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Multiple Products */}
                    {post.content.products && post.content.products.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {post.content.products.map((product) => (
                          <div key={product.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-sm text-gray-900">{product.name}</h5>
                                <p className="text-xs text-gray-600">{product.brand}</p>
                                <p className="text-sm font-bold text-gray-900">${product.price}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.hashtags.map((hashtag, index) => (
                          <span
                            key={index}
                            className="text-pink-600 hover:text-pink-700 cursor-pointer text-sm"
                          >
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <span>{formatNumber(post.engagement.likes)} likes</span>
                      <span>{formatNumber(post.engagement.comments)} comments</span>
                      <span>{formatNumber(post.engagement.shares)} shares</span>
                    </div>
                    <span>{formatNumber(post.engagement.saves)} saves</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        {likedPosts.includes(post.id) ? (
                          <MdFavorite className="w-5 h-5" />
                        ) : (
                          <MdFavoriteBorder className="w-5 h-5" />
                        )}
                        <span className="text-sm">Like</span>
                      </button>
                      
                      <button
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        <MdComment className="w-5 h-5" />
                        <span className="text-sm">Comment</span>
                      </button>
                      
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                      >
                        <MdShare className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleSave(post.id)}
                      className={`transition-colors ${
                        savedPosts.includes(post.id) ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
                      }`}
                    >
                      {savedPosts.includes(post.id) ? (
                        <MdBookmark className="w-5 h-5" />
                      ) : (
                        <MdBookmarkBorder className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments === post.id && (
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <img
                          src={userProfile.avatar}
                          alt="Your avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 flex items-center space-x-2">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment.trim()}
                            className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <MdSend className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
            {/* Trending Hashtags */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Trending</h3>
              <div className="space-y-2">
                {trendingHashtags.slice(0, 5).map((hashtag) => (
                  <div key={hashtag.tag} className="flex items-center justify-between">
                    <span className="text-pink-600 hover:text-pink-700 cursor-pointer">
                      {hashtag.tag}
                    </span>
                    <span className="text-sm text-gray-500">{formatNumber(hashtag.posts)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Suggested for You</h3>
              <div className="space-y-3">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        <h4 className="font-medium text-sm text-gray-900">{user.displayName}</h4>
                        {user.verified && (
                          <MdVerified className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{formatNumber(user.followers)} followers</p>
                      {user.mutualFollowers > 0 && (
                        <p className="text-xs text-gray-400">{user.mutualFollowers} mutual followers</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleFollow(user.id)}
                      className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                    >
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Your Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Liked</span>
                  <span className="font-medium">{analytics.userLikes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Saved</span>
                  <span className="font-medium">{analytics.userSaves}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Following</span>
                  <span className="font-medium">{analytics.following}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-medium">{analytics.engagementRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create Post</h3>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={userProfile.avatar}
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{userProfile.displayName}</h4>
                    <p className="text-sm text-gray-500">@{userProfile.username}</p>
                  </div>
                </div>
                
                <textarea
                  value={newPost.text}
                  onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
                  placeholder="What's on your mind? Share your latest finds!"
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MdImage className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MdEmojiEmotions className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.text.trim()}
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialFeedsWidget;
