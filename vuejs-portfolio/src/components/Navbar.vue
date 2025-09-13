<template>
  <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand text-gradient">
        {{ personalInfo.name.split(' ')[0] }}
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" :class="{ active: $route.name === 'Home' }">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" :class="{ active: $route.name === 'About' }">
              About
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/experience" class="nav-link" :class="{ active: $route.name === 'Experience' }">
              Experience
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/projects" class="nav-link" :class="{ active: $route.name === 'Projects' }">
              Projects
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/skills" class="nav-link" :class="{ active: $route.name === 'Skills' }">
              Skills
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/blog" class="nav-link" :class="{ active: $route.name === 'Blog' }">
              Blog
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" :class="{ active: $route.name === 'Contact' }">
              Contact
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { personalInfo } from '../data/personal.js'

export default {
  name: 'Navbar',
  data() {
    return {
      personalInfo
    }
  },
  mounted() {
    // Add scroll effect to navbar
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const navbar = document.querySelector('.navbar-custom')
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)'
        navbar.style.backdropFilter = 'blur(10px)'
      } else {
        navbar.style.background = 'var(--navbar-bg)'
        navbar.style.backdropFilter = 'blur(10px)'
      }
    }
  }
}
</script>

<style scoped>
.navbar-custom {
  transition: all 0.3s ease;
}

.navbar-brand {
  font-size: 1.8rem;
  font-weight: 700;
}

.nav-link {
  position: relative;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color) !important;
}

.nav-link.active {
  color: var(--primary-color) !important;
}

@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.5rem;
  }
}
</style>
