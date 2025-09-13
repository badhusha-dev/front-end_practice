<template>
  <div class="blog-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header text-center py-5">
        <h1 class="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">Blog & Articles</h1>
        <p class="lead animate__animated animate__fadeInUp animate__delay-1s">Thoughts on technology, development, and industry insights</p>
      </div>

      <!-- Featured Posts -->
      <div class="featured-posts mb-5" v-if="featuredPosts.length > 0">
        <h3 class="text-center mb-4">Featured Articles</h3>
        <div class="row">
          <div 
            v-for="(post, index) in featuredPosts" 
            :key="post.id"
            class="col-lg-6 mb-4"
          >
            <div class="featured-post-card card card-custom h-100 animate__animated animate__fadeInUp" :style="{ animationDelay: (index * 0.2) + 's' }">
              <img :src="post.image" class="card-img-top" :alt="post.title" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <div class="post-meta mb-2">
                  <span class="badge bg-primary me-2">Featured</span>
                  <small class="text-muted">{{ formatDate(post.date) }} • {{ post.readTime }}</small>
                </div>
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.excerpt }}</p>
                <div class="post-tags mb-3">
                  <span 
                    v-for="tag in post.tags" 
                    :key="tag" 
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
                <router-link :to="`/blog/${post.slug}`" class="btn btn-outline-primary">
                  Read More
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="blog-posts">
        <h3 class="text-center mb-4">All Articles</h3>
        <div class="row">
          <div 
            v-for="(post, index) in blogPosts" 
            :key="post.id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="blog-post-card card card-custom h-100 animate__animated animate__fadeInUp" :style="{ animationDelay: (index * 0.1) + 's' }">
              <img :src="post.image" class="card-img-top" :alt="post.title" style="height: 200px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <div class="post-meta mb-2">
                  <small class="text-muted">{{ formatDate(post.date) }} • {{ post.readTime }}</small>
                </div>
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text flex-grow-1">{{ post.excerpt }}</p>
                <div class="post-tags mb-3">
                  <span 
                    v-for="tag in post.tags.slice(0, 3)" 
                    :key="tag" 
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="post.tags.length > 3" class="tag">
                    +{{ post.tags.length - 3 }}
                  </span>
                </div>
                <router-link :to="`/blog/${post.slug}`" class="btn btn-outline-primary">
                  Read More
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Statistics -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Blog Statistics</h3>
              <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                    <div class="stat-icon mb-3">
                      <i class="fas fa-newspaper fa-3x text-primary"></i>
                    </div>
                    <h4>{{ blogPosts.length }}</h4>
                    <p class="text-muted">Total Articles</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                    <div class="stat-icon mb-3">
                      <i class="fas fa-star fa-3x text-warning"></i>
                    </div>
                    <h4>{{ featuredPosts.length }}</h4>
                    <p class="text-muted">Featured Posts</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                      <div class="stat-icon mb-3">
                        <i class="fas fa-tags fa-3x text-success"></i>
                      </div>
                      <h4>{{ totalTags }}</h4>
                      <p class="text-muted">Unique Tags</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                    <div class="stat-icon mb-3">
                      <i class="fas fa-clock fa-3x text-info"></i>
                    </div>
                    <h4>{{ averageReadTime }}</h4>
                    <p class="text-muted">Avg. Read Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Tags -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="text-center mb-4">Popular Tags</h3>
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <div class="tags-cloud">
                <span 
                  v-for="(tag, tagName) in popularTags" 
                  :key="tagName"
                  class="tag-cloud-item"
                  :style="{ fontSize: (tag.count / Math.max(...Object.values(popularTags).map(t => t.count)) * 1.5 + 0.8) + 'rem' }"
                >
                  {{ tagName }} ({{ tag.count }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="newsletter-signup card card-custom animate__animated animate__fadeInUp">
            <div class="card-body text-center">
              <h3 class="card-title mb-3">Stay Updated</h3>
              <p class="lead mb-4">Subscribe to my newsletter for the latest articles and tech insights</p>
              <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                <div class="row justify-content-center">
                  <div class="col-md-6">
                    <div class="input-group">
                      <input 
                        type="email" 
                        class="form-control form-control-custom" 
                        placeholder="Enter your email address"
                        v-model="newsletterEmail"
                        required
                      >
                      <button class="btn btn-primary-custom btn-custom" type="submit" :disabled="isSubscribing">
                        <span v-if="isSubscribing" class="loading me-2"></span>
                        <i v-else class="fas fa-paper-plane me-2"></i>
                        {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div v-if="showNewsletterSuccess" class="alert alert-success mt-3 animate__animated animate__fadeIn">
                <i class="fas fa-check-circle me-2"></i>
                Thank you for subscribing! You'll receive updates on new articles.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="row mt-5">
        <div class="col-12 text-center">
          <div class="cta-section animate__animated animate__fadeInUp">
            <h3 class="mb-3">Interested in My Work?</h3>
            <p class="lead mb-4">Let's discuss how I can help with your next project</p>
            <router-link to="/contact" class="btn btn-primary-custom btn-custom me-3">
              <i class="fas fa-envelope me-2"></i>Contact Me
            </router-link>
            <router-link to="/projects" class="btn btn-outline-custom btn-custom">
              <i class="fas fa-code me-2"></i>View Projects
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blogPosts } from '../data/blog.js'

export default {
  name: 'Blog',
  data() {
    return {
      blogPosts,
      newsletterEmail: '',
      isSubscribing: false,
      showNewsletterSuccess: false
    }
  },
  computed: {
    featuredPosts() {
      return this.blogPosts.filter(post => post.featured)
    },
    totalTags() {
      const allTags = new Set()
      this.blogPosts.forEach(post => {
        post.tags.forEach(tag => allTags.add(tag))
      })
      return allTags.size
    },
    averageReadTime() {
      const totalReadTime = this.blogPosts.reduce((sum, post) => {
        const minutes = parseInt(post.readTime.replace(' min read', ''))
        return sum + minutes
      }, 0)
      return Math.round(totalReadTime / this.blogPosts.length) + ' min'
    },
    popularTags() {
      const tagCount = {}
      this.blogPosts.forEach(post => {
        post.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1
        })
      })
      
      // Sort by count and return top tags
      return Object.entries(tagCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .reduce((obj, [tag, count]) => {
          obj[tag] = { count }
          return obj
        }, {})
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    async subscribeNewsletter() {
      this.isSubscribing = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        this.newsletterEmail = ''
        this.showNewsletterSuccess = true
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showNewsletterSuccess = false
        }, 5000)
        
      } catch (error) {
        console.error('Error subscribing to newsletter:', error)
        alert('There was an error subscribing to the newsletter. Please try again.')
      } finally {
        this.isSubscribing = false
      }
    }
  }
}
</script>

<style scoped>
.blog-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  color: white;
  margin: -20px -15px 0;
  border-radius: 0 0 20px 20px;
}

.featured-post-card,
.blog-post-card {
  background: var(--card-bg);
  color: var(--text-color);
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.featured-post-card:hover,
.blog-post-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.stat-item {
  padding: 20px;
  background: rgba(0, 123, 255, 0.05);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(0, 123, 255, 0.1);
  transform: translateY(-5px);
}

.stat-icon {
  margin-bottom: 15px;
}

.tags-cloud {
  text-align: center;
  line-height: 2.5;
}

.tag-cloud-item {
  display: inline-block;
  margin: 5px 10px;
  padding: 5px 10px;
  background: var(--primary-color);
  color: white;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tag-cloud-item:hover {
  background: var(--dark-color);
  transform: scale(1.1);
}

.newsletter-signup {
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(23, 162, 184, 0.05));
  border: 2px solid rgba(0, 123, 255, 0.1);
}

.form-control-custom {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;
  background: var(--body-bg);
  color: var(--text-color);
}

.form-control-custom:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.loading {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.cta-section {
  background: var(--light-color);
  padding: 40px;
  border-radius: 15px;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .page-header {
    margin: -20px -15px 0;
  }
  
  .newsletter-form .input-group {
    flex-direction: column;
  }
  
  .newsletter-form .btn {
    margin-top: 10px;
    width: 100%;
  }
  
  .cta-section {
    padding: 30px 20px;
  }
}
</style>
