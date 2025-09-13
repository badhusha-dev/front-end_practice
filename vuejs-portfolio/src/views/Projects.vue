<template>
  <div class="projects-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header text-center py-5">
        <h1 class="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">My Projects</h1>
        <p class="lead animate__animated animate__fadeInUp animate__delay-1s">A showcase of my recent work and side projects</p>
      </div>

      <!-- Project Filters -->
      <div class="project-filters text-center mb-5">
        <div class="btn-group" role="group">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            type="button" 
            class="btn"
            :class="activeFilter === filter.value ? 'btn-primary' : 'btn-outline-primary'"
            @click="setFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div class="row">
          <div 
            v-for="(project, index) in filteredProjects" 
            :key="project.id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <ProjectCard 
              :project="project" 
              :class="'animate__animated animate__fadeInUp'"
              :style="{ animationDelay: (index * 0.1) + 's' }"
            />
          </div>
        </div>
      </div>

      <!-- Project Statistics -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Project Statistics</h3>
              <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                    <div class="stat-icon mb-3">
                      <i class="fas fa-code fa-3x text-primary"></i>
                    </div>
                    <h4>{{ projects.length }}</h4>
                    <p class="text-muted">Total Projects</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                    <div class="stat-icon mb-3">
                      <i class="fas fa-check-circle fa-3x text-success"></i>
                    </div>
                    <h4>{{ completedProjects }}</h4>
                    <p class="text-muted">Completed</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                    <div class="stat-icon mb-3">
                      <i class="fas fa-clock fa-3x text-warning"></i>
                    </div>
                    <h4>{{ inProgressProjects }}</h4>
                    <p class="text-muted">In Progress</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="stat-item text-center">
                    <div class="stat-icon mb-3">
                      <i class="fas fa-tools fa-3x text-info"></i>
                    </div>
                    <h4>{{ totalTechnologies }}</h4>
                    <p class="text-muted">Technologies Used</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technology Usage -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="text-center mb-4">Technology Usage</h3>
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6 mb-4" v-for="(category, categoryName) in technologyUsage" :key="categoryName">
                  <h5 class="mb-3">{{ categoryName.charAt(0).toUpperCase() + categoryName.slice(1) }}</h5>
                  <div class="tech-usage">
                    <div 
                      v-for="tech in category" 
                      :key="tech.name"
                      class="tech-usage-item mb-2"
                    >
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <span>{{ tech.name }}</span>
                        <span class="text-muted">{{ tech.count }} projects</span>
                      </div>
                      <div class="progress progress-custom">
                        <div 
                          class="progress-bar progress-bar-custom" 
                          :style="{ width: (tech.count / Math.max(...category.map(t => t.count)) * 100) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Project Highlight -->
      <div class="row mt-5" v-if="featuredProject">
        <div class="col-12">
          <div class="card card-custom featured-project animate__animated animate__fadeInUp">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-lg-6">
                  <div class="featured-content">
                    <div class="featured-badge mb-3">
                      <span class="badge bg-primary">Featured Project</span>
                    </div>
                    <h3 class="mb-3">{{ featuredProject.title }}</h3>
                    <p class="lead mb-4">{{ featuredProject.description }}</p>
                    <div class="featured-tech mb-4">
                      <span 
                        v-for="tech in featuredProject.techStack.slice(0, 5)" 
                        :key="tech" 
                        class="tech-tag me-2"
                      >
                        {{ tech }}
                      </span>
                    </div>
                    <div class="featured-links">
                      <a :href="featuredProject.link" target="_blank" class="btn btn-primary me-2">
                        <i class="fab fa-github me-1"></i>View Code
                      </a>
                      <a 
                        v-if="featuredProject.demoLink" 
                        :href="featuredProject.demoLink" 
                        target="_blank" 
                        class="btn btn-outline-primary"
                      >
                        <i class="fas fa-external-link-alt me-1"></i>Live Demo
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="featured-image">
                    <img 
                      :src="featuredProject.image" 
                      :alt="featuredProject.title"
                      class="img-fluid rounded shadow-custom"
                    >
                  </div>
                </div>
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
            <a :href="personalInfo.github" target="_blank" class="btn btn-outline-custom btn-custom">
              <i class="fab fa-github me-2"></i>View GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'
import { personalInfo } from '../data/personal.js'

export default {
  name: 'Projects',
  components: {
    ProjectCard
  },
  data() {
    return {
      projects,
      personalInfo,
      activeFilter: 'all',
      filters: [
        { label: 'All Projects', value: 'all' },
        { label: 'Completed', value: 'Completed' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Featured', value: 'featured' }
      ]
    }
  },
  computed: {
    filteredProjects() {
      switch (this.activeFilter) {
        case 'Completed':
          return this.projects.filter(p => p.status === 'Completed')
        case 'In Progress':
          return this.projects.filter(p => p.status === 'In Progress')
        case 'featured':
          return this.projects.filter(p => p.featured)
        default:
          return this.projects
      }
    },
    completedProjects() {
      return this.projects.filter(p => p.status === 'Completed').length
    },
    inProgressProjects() {
      return this.projects.filter(p => p.status === 'In Progress').length
    },
    totalTechnologies() {
      const allTechs = new Set()
      this.projects.forEach(project => {
        project.techStack.forEach(tech => allTechs.add(tech))
      })
      return allTechs.size
    },
    featuredProject() {
      return this.projects.find(p => p.featured) || this.projects[0]
    },
    technologyUsage() {
      const techCount = {}
      
      this.projects.forEach(project => {
        project.techStack.forEach(tech => {
          if (!techCount[tech]) {
            techCount[tech] = 0
          }
          techCount[tech]++
        })
      })

      const categories = {
        'Backend': ['Java', 'Spring Boot', 'Spring Cloud', 'Microservices', 'REST APIs', 'GraphQL', 'Node.js'],
        'Database': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Oracle'],
        'Cloud & DevOps': ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Git', 'Maven', 'Gradle', 'Linux'],
        'Messaging': ['Apache Kafka', 'RabbitMQ', 'Apache ActiveMQ', 'WebSocket', 'MQTT']
      }

      const result = {}
      Object.keys(categories).forEach(category => {
        result[category] = categories[category]
          .filter(tech => techCount[tech])
          .map(tech => ({ name: tech, count: techCount[tech] }))
          .sort((a, b) => b.count - a.count)
      })

      return result
    }
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  color: white;
  margin: -20px -15px 0;
  border-radius: 0 0 20px 20px;
}

.project-filters {
  margin: 40px 0;
}

.btn-group .btn {
  border-radius: 25px;
  margin: 0 5px;
  padding: 8px 20px;
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

.tech-usage-item {
  margin-bottom: 15px;
}

.progress-custom {
  height: 6px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}

.progress-bar-custom {
  background: linear-gradient(45deg, var(--primary-color), var(--info-color));
  border-radius: 10px;
}

.featured-project {
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(23, 162, 184, 0.05));
  border: 2px solid rgba(0, 123, 255, 0.1);
}

.featured-badge {
  display: inline-block;
}

.featured-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: var(--primary-color);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.featured-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.featured-image img {
  transition: all 0.3s ease;
}

.featured-image img:hover {
  transform: scale(1.05);
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
  
  .btn-group {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-group .btn {
    margin: 5px 0;
    width: 200px;
  }
  
  .featured-links {
    justify-content: center;
  }
  
  .featured-image {
    margin-top: 30px;
  }
  
  .cta-section {
    padding: 30px 20px;
  }
}
</style>
