<template>
  <div class="about-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header text-center py-5">
        <h1 class="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">About Me</h1>
        <p class="lead animate__animated animate__fadeInUp animate__delay-1s">{{ personalInfo.subtitle }}</p>
      </div>

      <!-- Profile Section -->
      <div class="row align-items-center mb-5">
        <div class="col-lg-4 text-center">
          <div class="profile-image animate__animated animate__fadeInLeft">
            <img 
              :src="personalInfo.profileImage" 
              :alt="personalInfo.name"
              class="img-fluid rounded-circle shadow-custom"
              style="max-width: 300px; width: 100%;"
            >
          </div>
        </div>
        <div class="col-lg-8">
          <div class="profile-content animate__animated animate__fadeInRight">
            <h2 class="mb-3">{{ personalInfo.name }}</h2>
            <h4 class="text-primary mb-4">{{ personalInfo.title }}</h4>
            <p class="lead mb-4">{{ personalInfo.bio }}</p>
            
            <div class="contact-info mb-4">
              <div class="row">
                <div class="col-md-6 mb-2">
                  <i class="fas fa-envelope text-primary me-2"></i>
                  <a :href="`mailto:${personalInfo.email}`" class="text-decoration-none">{{ personalInfo.email }}</a>
                </div>
                <div class="col-md-6 mb-2">
                  <i class="fas fa-phone text-primary me-2"></i>
                  <a :href="`tel:${personalInfo.phone}`" class="text-decoration-none">{{ personalInfo.phone }}</a>
                </div>
                <div class="col-md-6 mb-2">
                  <i class="fas fa-map-marker-alt text-primary me-2"></i>
                  {{ personalInfo.location }}
                </div>
                <div class="col-md-6 mb-2">
                  <i class="fas fa-calendar text-primary me-2"></i>
                  4+ Years Experience
                </div>
              </div>
            </div>

            <div class="social-links">
              <a :href="personalInfo.linkedin" target="_blank" class="btn btn-outline-primary me-2">
                <i class="fab fa-linkedin-in me-1"></i>LinkedIn
              </a>
              <a :href="personalInfo.github" target="_blank" class="btn btn-outline-dark me-2">
                <i class="fab fa-github me-1"></i>GitHub
              </a>
              <a :href="personalInfo.cv" download class="btn btn-primary">
                <i class="fas fa-download me-1"></i>Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Facts Section -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Quick Facts</h3>
              <div class="row">
                <div class="col-md-6" v-for="(fact, index) in personalInfo.quickFacts" :key="index">
                  <div class="fact-item d-flex align-items-center mb-3">
                    <i class="fas fa-check-circle text-success me-3"></i>
                    <span>{{ fact }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Overview -->
      <div class="row mb-5">
        <div class="col-12">
          <h3 class="text-center mb-4">Skills Overview</h3>
          <div class="row">
            <div class="col-lg-3 col-md-6 mb-4" v-for="(skillCategory, category) in skillsOverview" :key="category">
              <div class="skill-category-card text-center animate__animated animate__fadeInUp" :style="{ animationDelay: (Object.keys(skillsOverview).indexOf(category) * 0.1) + 's' }">
                <div class="skill-icon mb-3">
                  <i :class="skillCategory.icon" class="fas fa-3x text-primary"></i>
                </div>
                <h5>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</h5>
                <p class="text-muted">{{ skillCategory.count }} skills</p>
                <div class="skill-preview">
                  <span 
                    v-for="skill in skillCategory.skills.slice(0, 3)" 
                    :key="skill" 
                    class="tech-tag"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Professional Journey -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Professional Journey</h3>
              <div class="timeline-simple">
                <div 
                  v-for="(exp, index) in experiences" 
                  :key="exp.id" 
                  class="timeline-item-simple"
                  :class="{ 'animate__animated animate__fadeInLeft': index % 2 === 0, 'animate__animated animate__fadeInRight': index % 2 === 1 }"
                  :style="{ animationDelay: (index * 0.2) + 's' }"
                >
                  <div class="timeline-content-simple">
                    <div class="timeline-header-simple">
                      <h5>{{ exp.role }}</h5>
                      <h6 class="text-primary">{{ exp.company }}</h6>
                      <small class="text-muted">{{ exp.duration }} • {{ exp.location }}</small>
                    </div>
                    <p class="mt-2">{{ exp.responsibilities[0] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="row">
        <div class="col-12 text-center">
          <div class="cta-section animate__animated animate__fadeInUp">
            <h3 class="mb-3">Interested in Working Together?</h3>
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
import { personalInfo } from '../data/personal.js'
import { experiences } from '../data/experience.js'
import { skills } from '../data/skills.js'

export default {
  name: 'About',
  data() {
    return {
      personalInfo,
      experiences,
      skillsOverview: {
        backend: {
          icon: 'fa-server',
          count: skills.backend.length,
          skills: skills.backend.map(skill => skill.name)
        },
        frontend: {
          icon: 'fa-desktop',
          count: skills.frontend.length,
          skills: skills.frontend.map(skill => skill.name)
        },
        database: {
          icon: 'fa-database',
          count: skills.database.length,
          skills: skills.database.map(skill => skill.name)
        },
        tools: {
          icon: 'fa-tools',
          count: skills.tools.length,
          skills: skills.tools.map(skill => skill.name)
        }
      }
    }
  }
}
</script>

<style scoped>
.about-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  color: white;
  margin: -20px -15px 0;
  border-radius: 0 0 20px 20px;
}

.profile-image img {
  border: 5px solid rgba(0, 123, 255, 0.1);
  transition: all 0.3s ease;
}

.profile-image img:hover {
  transform: scale(1.05);
  border-color: rgba(0, 123, 255, 0.3);
}

.contact-info a {
  color: var(--text-color);
  transition: color 0.3s ease;
}

.contact-info a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.fact-item {
  padding: 10px;
  background: rgba(0, 123, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.fact-item:hover {
  background: rgba(0, 123, 255, 0.1);
  transform: translateX(5px);
}

.skill-category-card {
  padding: 30px 20px;
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
}

.skill-category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.skill-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin-top: 15px;
}

.tech-tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.timeline-simple {
  position: relative;
  padding: 20px 0;
}

.timeline-simple::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
  transform: translateX(-50%);
}

.timeline-item-simple {
  position: relative;
  margin: 30px 0;
  width: 50%;
}

.timeline-item-simple:nth-child(odd) {
  left: 0;
  padding-right: 40px;
}

.timeline-item-simple:nth-child(even) {
  left: 50%;
  padding-left: 40px;
}

.timeline-item-simple::before {
  content: '';
  position: absolute;
  top: 20px;
  width: 15px;
  height: 15px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 3px solid var(--body-bg);
}

.timeline-item-simple:nth-child(odd)::before {
  right: -7px;
}

.timeline-item-simple:nth-child(even)::before {
  left: -7px;
}

.timeline-content-simple {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.timeline-content-simple:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
  
  .timeline-simple::before {
    left: 20px;
  }
  
  .timeline-item-simple {
    width: 100%;
    left: 0 !important;
    padding-left: 60px !important;
    padding-right: 0 !important;
  }
  
  .timeline-item-simple::before {
    left: 10px !important;
    right: auto !important;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .cta-section {
    padding: 30px 20px;
  }
}
</style>
