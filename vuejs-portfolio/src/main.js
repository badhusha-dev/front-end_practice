import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'
import './assets/css/main.css'

// Import views
import Home from './views/Home.vue'
import About from './views/About.vue'
import Experience from './views/Experience.vue'
import Projects from './views/Projects.vue'
import Skills from './views/Skills.vue'
import Contact from './views/Contact.vue'
import Blog from './views/Blog.vue'

// Router configuration
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/experience', name: 'Experience', component: Experience },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/skills', name: 'Skills', component: Skills },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/blog', name: 'Blog', component: Blog }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Create Vue app
const app = createApp(App)

// Use router
app.use(router)

// Mount the app
app.mount('#app')

// Register service worker only in production to avoid dev interference
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
// Ensure dev environment doesn't keep an old service worker around
if (!import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister())
  })
}
