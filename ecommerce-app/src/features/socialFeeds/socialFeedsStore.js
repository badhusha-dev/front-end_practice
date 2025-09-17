import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSocialFeedsStore = create(
  persist(
    (set, get) => ({
      // Feed state
      feeds: [],
      currentFeed: 'discover', // discover, following, trending, categories
      isLoading: false,
      
      // User interactions
      likedPosts: [],
      savedPosts: [],
      sharedPosts: [],
      followedUsers: [],
      followedBrands: [],
      
      // Feed content
      posts: [],
      stories: [],
      trendingHashtags: [],
      suggestedUsers: [],
      
      // User profile
      userProfile: {
        id: 'current-user',
        username: 'shopper123',
        displayName: 'Shopping Enthusiast',
        avatar: '/api/placeholder/100/100',
        bio: 'Love discovering new products and sharing finds!',
        followers: 1250,
        following: 340,
        posts: 89,
        verified: false
      },
      
      // Actions
      initializeFeeds: () => {
        const mockFeeds = get().generateMockFeeds();
        set({ feeds: mockFeeds, posts: mockFeeds });
      },
      
      generateMockFeeds: () => {
        return [
          {
            id: 1,
            type: 'product-showcase',
            user: {
              id: 'user1',
              username: 'fashionista_amy',
              displayName: 'Amy Chen',
              avatar: '/api/placeholder/100/100',
              verified: true,
              followers: 12500
            },
            content: {
              text: 'Just got this amazing leather jacket! The quality is incredible and it fits perfectly. Perfect for fall weather 🍂',
              images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
              product: {
                id: 101,
                name: 'Premium Leather Jacket',
                brand: 'Fashion Forward',
                price: 299.99,
                originalPrice: 399.99,
                discount: 25,
                rating: 4.8,
                reviews: 1247,
                image: '/api/placeholder/300/400',
                category: 'clothing',
                tags: ['leather', 'jacket', 'fall', 'premium']
              }
            },
            engagement: {
              likes: 1247,
              comments: 89,
              shares: 23,
              saves: 156
            },
            timestamp: Date.now() - 3600000, // 1 hour ago
            location: 'New York, NY',
            hashtags: ['#fashion', '#leatherjacket', '#fallfashion', '#ootd'],
            isLiked: false,
            isSaved: false,
            isShared: false
          },
          {
            id: 2,
            type: 'review',
            user: {
              id: 'user2',
              username: 'tech_reviewer',
              displayName: 'Tech Reviewer Pro',
              avatar: '/api/placeholder/100/100',
              verified: true,
              followers: 45000
            },
            content: {
              text: 'Unboxing the new iPhone 15 Pro! First impressions: the titanium build feels premium, camera quality is outstanding, and the battery life is impressive. Worth the upgrade! 📱✨',
              images: ['/api/placeholder/400/500', '/api/placeholder/400/500', '/api/placeholder/400/500'],
              product: {
                id: 102,
                name: 'iPhone 15 Pro',
                brand: 'Apple',
                price: 999.00,
                rating: 4.9,
                reviews: 8934,
                image: '/api/placeholder/300/400',
                category: 'electronics',
                tags: ['smartphone', 'apple', 'premium', 'camera']
              }
            },
            engagement: {
              likes: 8934,
              comments: 234,
              shares: 567,
              saves: 1234
            },
            timestamp: Date.now() - 7200000, // 2 hours ago
            location: 'San Francisco, CA',
            hashtags: ['#iphone15', '#apple', '#techreview', '#unboxing'],
            isLiked: false,
            isSaved: false,
            isShared: false
          },
          {
            id: 3,
            type: 'lifestyle',
            user: {
              id: 'user3',
              username: 'home_decor_lover',
              displayName: 'Sarah Johnson',
              avatar: '/api/placeholder/100/100',
              verified: false,
              followers: 3400
            },
            content: {
              text: 'Transformed my living room with these beautiful plants and minimalist decor pieces. Creating a cozy, Instagram-worthy space! 🌿✨',
              images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
              products: [
                {
                  id: 103,
                  name: 'Monstera Deliciosa Plant',
                  brand: 'Green Thumb Co.',
                  price: 49.99,
                  image: '/api/placeholder/200/200',
                  category: 'home-garden'
                },
                {
                  id: 104,
                  name: 'Minimalist Ceramic Vase',
                  brand: 'Modern Home',
                  price: 29.99,
                  image: '/api/placeholder/200/200',
                  category: 'home-decor'
                }
              ]
            },
            engagement: {
              likes: 2341,
              comments: 67,
              shares: 45,
              saves: 234
            },
            timestamp: Date.now() - 10800000, // 3 hours ago
            location: 'Portland, OR',
            hashtags: ['#homedecor', '#plants', '#minimalist', '#cozy'],
            isLiked: false,
            isSaved: false,
            isShared: false
          },
          {
            id: 4,
            type: 'brand-promotion',
            user: {
              id: 'brand1',
              username: 'nike_official',
              displayName: 'Nike',
              avatar: '/api/placeholder/100/100',
              verified: true,
              followers: 2500000
            },
            content: {
              text: 'Just dropped! The new Air Max 270 in exclusive colorways. Limited stock available. Drop your size in the comments! 👟🔥',
              images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
              product: {
                id: 105,
                name: 'Nike Air Max 270',
                brand: 'Nike',
                price: 150.00,
                originalPrice: 180.00,
                discount: 17,
                rating: 4.7,
                reviews: 5678,
                image: '/api/placeholder/300/400',
                category: 'shoes',
                tags: ['sneakers', 'nike', 'airmax', 'limited']
              }
            },
            engagement: {
              likes: 45678,
              comments: 1234,
              shares: 890,
              saves: 3456
            },
            timestamp: Date.now() - 14400000, // 4 hours ago
            hashtags: ['#nike', '#airmax270', '#sneakers', '#limitededition'],
            isLiked: false,
            isSaved: false,
            isShared: false
          },
          {
            id: 5,
            type: 'haul',
            user: {
              id: 'user4',
              username: 'beauty_enthusiast',
              displayName: 'Emma Rodriguez',
              avatar: '/api/placeholder/100/100',
              verified: false,
              followers: 8900
            },
            content: {
              text: 'Sephora haul! Got some amazing new skincare products and makeup. Can\'t wait to try them all! What should I test first? 💄✨',
              images: ['/api/placeholder/400/500', '/api/placeholder/400/500', '/api/placeholder/400/500'],
              products: [
                {
                  id: 106,
                  name: 'Vitamin C Serum',
                  brand: 'Glow Up',
                  price: 45.99,
                  image: '/api/placeholder/200/200',
                  category: 'beauty'
                },
                {
                  id: 107,
                  name: 'Matte Lipstick Set',
                  brand: 'Beauty Pro',
                  price: 29.99,
                  image: '/api/placeholder/200/200',
                  category: 'beauty'
                }
              ]
            },
            engagement: {
              likes: 4567,
              comments: 123,
              shares: 67,
              saves: 456
            },
            timestamp: Date.now() - 18000000, // 5 hours ago
            hashtags: ['#sephora', '#skincare', '#makeup', '#haul'],
            isLiked: false,
            isSaved: false,
            isShared: false
          }
        ];
      },
      
      setCurrentFeed: (feedType) => {
        set({ currentFeed: feedType });
        get().filterFeedByType(feedType);
      },
      
      filterFeedByType: (feedType) => {
        const allPosts = get().generateMockFeeds();
        let filteredPosts = [];
        
        switch (feedType) {
          case 'discover':
            filteredPosts = allPosts;
            break;
          case 'following':
            filteredPosts = allPosts.filter(post => 
              get().followedUsers.includes(post.user.id) || 
              get().followedBrands.includes(post.user.id)
            );
            break;
          case 'trending':
            filteredPosts = allPosts.sort((a, b) => b.engagement.likes - a.engagement.likes);
            break;
          case 'categories':
            filteredPosts = allPosts.filter(post => 
              post.content.product?.category === 'electronics' ||
              post.content.products?.some(p => p.category === 'electronics')
            );
            break;
          default:
            filteredPosts = allPosts;
        }
        
        set({ posts: filteredPosts });
      },
      
      likePost: (postId) => {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  isLiked: !post.isLiked,
                  engagement: {
                    ...post.engagement,
                    likes: post.isLiked ? post.engagement.likes - 1 : post.engagement.likes + 1
                  }
                }
              : post
          ),
          likedPosts: state.posts.find(p => p.id === postId)?.isLiked
            ? state.likedPosts.filter(id => id !== postId)
            : [...state.likedPosts, postId]
        }));
      },
      
      savePost: (postId) => {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { ...post, isSaved: !post.isSaved }
              : post
          ),
          savedPosts: state.posts.find(p => p.id === postId)?.isSaved
            ? state.savedPosts.filter(id => id !== postId)
            : [...state.savedPosts, postId]
        }));
      },
      
      sharePost: (postId) => {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { 
                  ...post, 
                  isShared: true,
                  engagement: {
                    ...post.engagement,
                    shares: post.engagement.shares + 1
                  }
                }
              : post
          ),
          sharedPosts: [...state.sharedPosts, postId]
        }));
      },
      
      followUser: (userId) => {
        set(state => ({
          followedUsers: state.followedUsers.includes(userId)
            ? state.followedUsers.filter(id => id !== userId)
            : [...state.followedUsers, userId]
        }));
      },
      
      followBrand: (brandId) => {
        set(state => ({
          followedBrands: state.followedBrands.includes(brandId)
            ? state.followedBrands.filter(id => id !== brandId)
            : [...state.followedBrands, brandId]
        }));
      },
      
      createPost: (postData) => {
        const newPost = {
          id: Date.now(),
          type: 'user-post',
          user: get().userProfile,
          content: postData,
          engagement: {
            likes: 0,
            comments: 0,
            shares: 0,
            saves: 0
          },
          timestamp: Date.now(),
          hashtags: postData.hashtags || [],
          isLiked: false,
          isSaved: false,
          isShared: false
        };
        
        set(state => ({
          posts: [newPost, ...state.posts]
        }));
      },
      
      addComment: (postId, comment) => {
        set(state => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? {
                  ...post,
                  engagement: {
                    ...post.engagement,
                    comments: post.engagement.comments + 1
                  }
                }
              : post
          )
        }));
      },
      
      getTrendingHashtags: () => {
        return [
          { tag: '#fashion', posts: 12500 },
          { tag: '#tech', posts: 8900 },
          { tag: '#home', posts: 6700 },
          { tag: '#beauty', posts: 5600 },
          { tag: '#fitness', posts: 4500 },
          { tag: '#food', posts: 3400 },
          { tag: '#travel', posts: 2800 },
          { tag: '#art', posts: 2100 }
        ];
      },
      
      getSuggestedUsers: () => {
        return [
          {
            id: 'suggested1',
            username: 'fashion_blogger',
            displayName: 'Fashion Blogger',
            avatar: '/api/placeholder/100/100',
            followers: 15000,
            verified: true,
            mutualFollowers: 12
          },
          {
            id: 'suggested2',
            username: 'tech_guru',
            displayName: 'Tech Guru',
            avatar: '/api/placeholder/100/100',
            followers: 25000,
            verified: true,
            mutualFollowers: 8
          },
          {
            id: 'suggested3',
            username: 'home_designer',
            displayName: 'Home Designer',
            avatar: '/api/placeholder/100/100',
            followers: 8500,
            verified: false,
            mutualFollowers: 5
          }
        ];
      },
      
      getFeedAnalytics: () => {
        const { posts, likedPosts, savedPosts, followedUsers, followedBrands } = get();
        return {
          totalPosts: posts.length,
          totalLikes: posts.reduce((sum, post) => sum + post.engagement.likes, 0),
          totalComments: posts.reduce((sum, post) => sum + post.engagement.comments, 0),
          totalShares: posts.reduce((sum, post) => sum + post.engagement.shares, 0),
          userLikes: likedPosts.length,
          userSaves: savedPosts.length,
          following: followedUsers.length + followedBrands.length,
          engagementRate: 4.8
        };
      }
    }),
    {
      name: 'social-feeds-store',
      partialize: (state) => ({
        likedPosts: state.likedPosts,
        savedPosts: state.savedPosts,
        followedUsers: state.followedUsers,
        followedBrands: state.followedBrands,
        userProfile: state.userProfile
      })
    }
  )
);

export { useSocialFeedsStore };
