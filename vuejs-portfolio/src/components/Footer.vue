<template>
  <footer class="footer-custom">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4">
          <h5 class="mb-3">{{ personalInfo.name }}</h5>
          <p class="mb-3">{{ personalInfo.title }}</p>
          <p>{{ personalInfo.bio.substring(0, 150) }}...</p>
        </div>
        
        <div class="col-lg-4 col-md-6 mb-4">
          <h5 class="mb-3">Quick Links</h5>
          <ul class="list-unstyled">
            <li><router-link to="/about" class="text-decoration-none">About Me</router-link></li>
            <li><router-link to="/experience" class="text-decoration-none">Experience</router-link></li>
            <li><router-link to="/projects" class="text-decoration-none">Projects</router-link></li>
            <li><router-link to="/skills" class="text-decoration-none">Skills</router-link></li>
            <li><router-link to="/blog" class="text-decoration-none">Blog</router-link></li>
            <li><router-link to="/contact" class="text-decoration-none">Contact</router-link></li>
          </ul>
        </div>
        
        <div class="col-lg-4 col-md-12 mb-4">
          <h5 class="mb-3">Contact Info</h5>
          <div class="contact-info">
            <p><i class="fas fa-envelope me-2"></i>{{ personalInfo.email }}</p>
            <p><i class="fas fa-phone me-2"></i>{{ personalInfo.phone }}</p>
            <p><i class="fas fa-map-marker-alt me-2"></i>{{ personalInfo.location }}</p>
          </div>
          
          <div class="social-links">
            <a :href="personalInfo.linkedin" target="_blank" class="social-link" title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a :href="personalInfo.github" target="_blank" class="social-link" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a :href="personalInfo.cv" target="_blank" class="social-link" title="Download CV">
              <i class="fas fa-download"></i>
            </a>
            <a href="mailto:{{ personalInfo.email }}" class="social-link" title="Email">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      
      <hr class="my-4">
      
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="mb-0">&copy; {{ currentYear }} {{ personalInfo.name }}. All rights reserved.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="mb-0">Built with <i class="fas fa-heart text-danger"></i> using Vue.js & Bootstrap</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { personalInfo } from '../data/personal.js'

export default {
  name: 'Footer',
  data() {
    return {
      personalInfo,
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer-custom {
  background: var(--footer-bg);
  color: var(--text-color);
  padding: 60px 0 30px;
  margin-top: 80px;
}

.footer-custom h5 {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 20px;
}

.footer-custom ul li {
  margin-bottom: 8px;
}

.footer-custom ul li a {
  color: var(--text-color);
  transition: color 0.3s ease;
}

.footer-custom ul li a:hover {
  color: var(--primary-color);
}

.contact-info p {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.contact-info i {
  color: var(--primary-color);
  width: 20px;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-link {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.social-link:hover {
  background: var(--dark-color);
  transform: translateY(-3px);
  color: white;
}

hr {
  border-color: var(--border-color);
}

@media (max-width: 768px) {
  .footer-custom {
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .col-md-6.text-md-end {
    text-align: center !important;
  }
}
</style>
