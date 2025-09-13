<template>
  <section class="hero-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="hero-content">
            <h1 class="display-4 fw-bold mb-4 animate__animated animate__fadeInUp">
              {{ personalInfo.name }}
            </h1>
            <h2 class="h3 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
              <span class="typing-animation">{{ currentText }}</span>
            </h2>
            <p class="lead mb-4 animate__animated animate__fadeInUp animate__delay-2s">
              {{ personalInfo.subtitle }}
            </p>
            <p class="mb-5 animate__animated animate__fadeInUp animate__delay-3s">
              {{ personalInfo.bio }}
            </p>
            <div class="hero-buttons animate__animated animate__fadeInUp animate__delay-4s">
              <a :href="personalInfo.cv" class="btn btn-primary-custom btn-custom me-3" download>
                <i class="fas fa-download me-2"></i>Download CV
              </a>
              <router-link to="/contact" class="btn btn-outline-custom btn-custom">
                <i class="fas fa-envelope me-2"></i>Contact Me
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-image text-center animate__animated animate__fadeInRight animate__delay-2s">
            <img 
              :src="personalInfo.profileImage" 
              :alt="personalInfo.name"
              class="img-fluid rounded-circle shadow-custom"
              style="max-width: 400px; width: 100%;"
            >
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="scroll-indicator animate__animated animate__bounce animate__infinite animate__delay-5s">
      <a href="#about" class="scroll-down">
        <i class="fas fa-chevron-down"></i>
      </a>
    </div>
  </section>
</template>

<script>
import { personalInfo } from '../data/personal.js'

export default {
  name: 'Hero',
  data() {
    return {
      personalInfo,
      currentText: '',
      fullText: personalInfo.title,
      isDeleting: false,
      typeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 2000
    }
  },
  mounted() {
    this.startTyping()
  },
  methods: {
    startTyping() {
      this.typeText()
    },
    typeText() {
      if (this.isDeleting) {
        this.currentText = this.fullText.substring(0, this.currentText.length - 1)
        setTimeout(() => this.typeText(), this.deleteSpeed)
      } else {
        this.currentText = this.fullText.substring(0, this.currentText.length + 1)
        if (this.currentText === this.fullText) {
          setTimeout(() => {
            this.isDeleting = true
            this.typeText()
          }, this.pauseTime)
        } else {
          setTimeout(() => this.typeText(), this.typeSpeed)
        }
      }
      
      if (this.currentText === '') {
        this.isDeleting = false
        setTimeout(() => this.typeText(), 500)
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.1)" points="0,1000 1000,0 1000,1000"/></svg>');
  background-size: cover;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.typing-animation {
  border-right: 2px solid white;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { border-color: white; }
  51%, 100% { border-color: transparent; }
}

.hero-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-down {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.scroll-down:hover {
  color: rgba(255, 255, 255, 0.8);
  transform: translateY(5px);
}

.hero-image img {
  border: 5px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.hero-image img:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 768px) {
  .hero-section {
    text-align: center;
    padding: 100px 0 50px;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-image {
    margin-top: 40px;
  }
  
  .hero-image img {
    max-width: 300px !important;
  }
}

@media (max-width: 576px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .hero-section h2 {
    font-size: 1.5rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-custom {
    width: 200px;
  }
}
</style>
