<template>
  <div id="app" :class="themeClass">
    <Navbar />
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <ThemeToggle :current-theme="currentTheme" @update-theme="setTheme" />
    
    <!-- Scroll to Top Button -->
    <button 
      class="scroll-to-top"
      :class="{ visible: showScrollToTop }"
      @click="scrollToTop"
      title="Scroll to top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    ThemeToggle
  },
  setup() {
    const currentTheme = ref('light')
    const showScrollToTop = ref(false)

    const themeClass = computed(() => {
      return `theme-${currentTheme.value}`
    })

    const loadTheme = () => {
      const savedTheme = localStorage.getItem('portfolio-theme')
      if (savedTheme) {
        currentTheme.value = savedTheme
      }
    }

    const setTheme = (theme) => {
      currentTheme.value = theme
      localStorage.setItem('portfolio-theme', theme)
    }

    const handleScroll = () => {
      showScrollToTop.value = window.scrollY > 300
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      loadTheme()
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      themeClass,
      currentTheme,
      setTheme,
      showScrollToTop,
      scrollToTop
    }
  }
}
</script>

<style>
/* Global styles */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --body-bg: #ffffff;
  --text-color: #333333;
  --border-color: #dee2e6;
  --shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* Light theme */
.theme-light {
  --body-bg: #ffffff;
  --text-color: #333333;
  --card-bg: #ffffff;
  --navbar-bg: #ffffff;
  --footer-bg: #f8f9fa;
}

/* Dark theme */
.theme-dark {
  --body-bg: #1a1a1a;
  --text-color: #ffffff;
  --card-bg: #2d2d2d;
  --navbar-bg: #2d2d2d;
  --footer-bg: #1a1a1a;
}

/* Blue theme */
.theme-blue {
  --body-bg: #f0f8ff;
  --text-color: #1e3a8a;
  --card-bg: #ffffff;
  --navbar-bg: #3b82f6;
  --footer-bg: #1e40af;
}

/* Green theme */
.theme-green {
  --body-bg: #f0fdf4;
  --text-color: #166534;
  --card-bg: #ffffff;
  --navbar-bg: #22c55e;
  --footer-bg: #15803d;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--body-bg);
  color: var(--text-color);
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--light-color);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--dark-color);
}

/* Utility classes */
.text-gradient {
  background: linear-gradient(45deg, var(--primary-color), var(--info-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shadow-custom {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.border-gradient {
  border: 2px solid;
  border-image: linear-gradient(45deg, var(--primary-color), var(--info-color)) 1;
}

/* Animation classes */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

.slide-up {
  animation: slideUp 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
