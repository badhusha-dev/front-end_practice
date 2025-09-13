<template>
  <div class="home-page">
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <section id="about" class="section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-content animate__animated animate__fadeInLeft">
              <h2 class="section-title text-start">About Me</h2>
              <p class="lead">{{ personalInfo.bio }}</p>
              <div class="quick-facts">
                <h5 class="mb-3">Quick Facts:</h5>
                <ul class="list-unstyled">
                  <li v-for="fact in personalInfo.quickFacts" :key="fact" class="mb-2">
                    <i class="fas fa-check-circle text-success me-2"></i>{{ fact }}
                  </li>
                </ul>
              </div>
              <div class="about-buttons mt-4">
                <router-link to="/about" class="btn btn-primary-custom btn-custom me-3">
                  Learn More
                </router-link>
                <router-link to="/contact" class="btn btn-outline-custom btn-custom">
                  Get In Touch
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="about-image text-center animate__animated animate__fadeInRight">
              <img 
                :src="personalInfo.profileImage" 
                :alt="personalInfo.name"
                class="img-fluid rounded shadow-custom"
                style="max-width: 500px; width: 100%;"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Preview Section -->
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title">Core Skills</h2>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4" v-for="(skill, index) in featuredSkills" :key="index">
            <div class="skill-preview text-center animate__animated animate__fadeInUp" :style="{ animationDelay: (index * 0.1) + 's' }">
              <div class="skill-icon mb-3">
                <i :class="skill.icon" class="fas fa-3x text-primary"></i>
              </div>
              <h5>{{ skill.name }}</h5>
              <p class="text-muted">{{ skill.description }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link to="/skills" class="btn btn-primary-custom btn-custom">
            View All Skills
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(project, index) in featuredProjects" :key="project.id">
            <ProjectCard 
              :project="project" 
              :class="'animate__animated animate__fadeInUp'"
              :style="{ animationDelay: (index * 0.2) + 's' }"
            />
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link to="/projects" class="btn btn-outline-custom btn-custom">
            View All Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- Experience Preview Section -->
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title">Professional Experience</h2>
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" v-for="(exp, index) in recentExperience" :key="exp.id">
            <div class="experience-preview card card-custom h-100 animate__animated animate__fadeInUp" :style="{ animationDelay: (index * 0.2) + 's' }">
              <div class="card-body">
                <h5 class="card-title">{{ exp.role }}</h5>
                <h6 class="card-subtitle text-primary mb-2">{{ exp.company }}</h6>
                <p class="text-muted mb-3">{{ exp.duration }}</p>
                <p class="card-text">{{ exp.responsibilities[0] }}</p>
                <div class="tech-preview">
                  <span 
                    v-for="tech in exp.technologies.slice(0, 3)" 
                    :key="tech" 
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link to="/experience" class="btn btn-primary-custom btn-custom">
            View Full Experience
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section bg-primary text-white">
      <div class="container text-center">
        <h2 class="mb-4">Ready to Work Together?</h2>
        <p class="lead mb-4">Let's discuss your next project and how I can help bring your ideas to life.</p>
        <div class="cta-buttons">
          <router-link to="/contact" class="btn btn-light btn-custom me-3">
            <i class="fas fa-envelope me-2"></i>Contact Me
          </router-link>
          <a :href="personalInfo.cv" class="btn btn-outline-light btn-custom" download>
            <i class="fas fa-download me-2"></i>Download CV
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { personalInfo } from '../data/personal.js'
import { projects } from '../data/projects.js'
import { experiences } from '../data/experience.js'

export default {
  name: 'Home',
  components: {
    Hero,
    ProjectCard
  },
  data() {
    return {
      personalInfo,
      featuredSkills: [
        {
          name: 'Java Development',
          description: '4+ years of experience in Java ecosystem',
          icon: 'fa-coffee'
        },
        {
          name: 'Spring Boot',
          description: 'Expert in Spring framework and microservices',
          icon: 'fa-leaf'
        },
        {
          name: 'Cloud Technologies',
          description: 'AWS, Docker, Kubernetes expertise',
          icon: 'fa-cloud'
        },
        {
          name: 'Database Design',
          description: 'PostgreSQL, MySQL, MongoDB optimization',
          icon: 'fa-database'
        }
      ]
    }
  },
  computed: {
    featuredProjects() {
      return projects.filter(project => project.featured || project.status === 'Completed').slice(0, 3)
    },
    recentExperience() {
      return experiences.slice(0, 3)
    }
  }
}
</script>

<style scoped>
.home-page {
  padding-top: 80px;
}

.section {
  padding: 80px 0;
}

.bg-light {
  background-color: var(--light-color) !important;
}

.bg-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--info-color)) !important;
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, var(--primary-color), var(--info-color));
  border-radius: 2px;
}

.section-title.text-start::after {
  left: 0;
  transform: none;
}

.quick-facts ul li {
  display: flex;
  align-items: flex-start;
}

.quick-facts ul li i {
  margin-top: 2px;
  flex-shrink: 0;
}

.skill-preview {
  padding: 30px 20px;
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.skill-preview:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.skill-icon {
  margin-bottom: 20px;
}

.experience-preview {
  transition: all 0.3s ease;
}

.experience-preview:hover {
  transform: translateY(-5px);
}

.tech-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
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

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .section {
    padding: 60px 0;
  }
  
  .about-buttons {
    text-align: center;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons .btn {
    width: 200px;
  }
}
</style>
