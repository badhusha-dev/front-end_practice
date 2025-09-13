<template>
  <div class="experience-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header text-center py-5">
        <h1 class="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">Professional Experience</h1>
        <p class="lead animate__animated animate__fadeInUp animate__delay-1s">4+ years of building scalable applications and leading development teams</p>
      </div>

      <!-- Experience Timeline -->
      <div class="timeline-section">
        <div class="timeline">
          <TimelineItem 
            v-for="(experience, index) in experiences" 
            :key="experience.id"
            :experience="experience"
            :index="index"
          />
        </div>
      </div>

      <!-- Experience Summary -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Experience Summary</h3>
              <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-briefcase fa-3x text-primary"></i>
                    </div>
                    <h4>{{ experiences.length }}</h4>
                    <p class="text-muted">Companies</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-calendar-alt fa-3x text-primary"></i>
                    </div>
                    <h4>4+</h4>
                    <p class="text-muted">Years Experience</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-code fa-3x text-primary"></i>
                    </div>
                    <h4>{{ totalTechnologies }}</h4>
                    <p class="text-muted">Technologies</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-project-diagram fa-3x text-primary"></i>
                    </div>
                    <h4>{{ totalProjects }}</h4>
                    <p class="text-muted">Projects Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Achievements -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="text-center mb-4">Key Achievements</h3>
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" v-for="(achievement, index) in keyAchievements" :key="index">
              <div class="achievement-card card card-custom h-100 animate__animated animate__fadeInUp" :style="{ animationDelay: (index * 0.1) + 's' }">
                <div class="card-body text-center">
                  <div class="achievement-icon mb-3">
                    <i :class="achievement.icon" class="fas fa-2x text-primary"></i>
                  </div>
                  <h5 class="card-title">{{ achievement.title }}</h5>
                  <p class="card-text">{{ achievement.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technology Evolution -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Technology Evolution</h3>
              <div class="timeline-tech">
                <div 
                  v-for="(tech, index) in technologyEvolution" 
                  :key="index"
                  class="tech-evolution-item"
                  :class="{ 'animate__animated animate__fadeInLeft': index % 2 === 0, 'animate__animated animate__fadeInRight': index % 2 === 1 }"
                  :style="{ animationDelay: (index * 0.2) + 's' }"
                >
                  <div class="tech-year">{{ tech.year }}</div>
                  <div class="tech-content">
                    <h6>{{ tech.title }}</h6>
                    <p>{{ tech.description }}</p>
                    <div class="tech-tags">
                      <span 
                        v-for="tag in tech.technologies" 
                        :key="tag" 
                        class="tech-tag"
                      >
                        {{ tag }}
                      </span>
                    </div>
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
            <h3 class="mb-3">Ready to Work Together?</h3>
            <p class="lead mb-4">Let's discuss how my experience can benefit your project</p>
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
import TimelineItem from '../components/TimelineItem.vue'
import { experiences } from '../data/experience.js'
import { projects } from '../data/projects.js'

export default {
  name: 'Experience',
  components: {
    TimelineItem
  },
  data() {
    return {
      experiences,
      keyAchievements: [
        {
          icon: 'fa-rocket',
          title: 'Scalable Architecture',
          description: 'Designed and implemented microservices architecture serving 100K+ daily requests'
        },
        {
          icon: 'fa-chart-line',
          title: 'Performance Optimization',
          description: 'Achieved 40% performance improvement through database query optimization'
        },
        {
          icon: 'fa-users',
          title: 'Team Leadership',
          description: 'Mentored junior developers and led cross-functional teams in Agile environment'
        },
        {
          icon: 'fa-cloud',
          title: 'Cloud Migration',
          description: 'Successfully migrated legacy applications to cloud platforms with zero downtime'
        },
        {
          icon: 'fa-shield-alt',
          title: 'Security Implementation',
          description: 'Implemented comprehensive security measures using Spring Security and JWT'
        },
        {
          icon: 'fa-cogs',
          title: 'CI/CD Pipeline',
          description: 'Established automated CI/CD pipelines reducing deployment time by 60%'
        }
      ],
      technologyEvolution: [
        {
          year: '2019',
          title: 'Foundation',
          description: 'Started with core Java development and Spring Framework basics',
          technologies: ['Java 8', 'Spring MVC', 'MySQL', 'Git']
        },
        {
          year: '2020',
          title: 'Backend Expertise',
          description: 'Advanced Spring Boot development and REST API design',
          technologies: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'Maven']
        },
        {
          year: '2021',
          title: 'Cloud & DevOps',
          description: 'Introduced to cloud technologies and containerization',
          technologies: ['Docker', 'AWS', 'Jenkins', 'Linux']
        },
        {
          year: '2022',
          title: 'Microservices',
          description: 'Mastered microservices architecture and distributed systems',
          technologies: ['Spring Cloud', 'Kubernetes', 'Redis', 'Apache Kafka']
        },
        {
          year: '2023',
          title: 'Advanced Technologies',
          description: 'Explored advanced patterns and modern Java features',
          technologies: ['Java 11', 'GraphQL', 'Elasticsearch', 'Prometheus']
        },
        {
          year: '2024',
          title: 'Innovation & Leadership',
          description: 'Leading teams and exploring cutting-edge technologies',
          technologies: ['Java 17', 'Quarkus', 'Apache Pulsar', 'Istio']
        }
      ]
    }
  },
  computed: {
    totalTechnologies() {
      const allTechs = new Set()
      this.experiences.forEach(exp => {
        exp.technologies.forEach(tech => allTechs.add(tech))
      })
      return allTechs.size
    },
    totalProjects() {
      return projects.filter(p => p.status === 'Completed').length
    }
  }
}
</script>

<style scoped>
.experience-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  color: white;
  margin: -20px -15px 0;
  border-radius: 0 0 20px 20px;
}

.timeline-section {
  margin: 60px 0;
}

.summary-item {
  padding: 20px;
  background: rgba(0, 123, 255, 0.05);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.summary-item:hover {
  background: rgba(0, 123, 255, 0.1);
  transform: translateY(-5px);
}

.summary-icon {
  margin-bottom: 15px;
}

.achievement-card {
  transition: all 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.achievement-icon {
  margin-bottom: 15px;
}

.timeline-tech {
  position: relative;
  padding: 20px 0;
}

.timeline-tech::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
  transform: translateX(-50%);
}

.tech-evolution-item {
  position: relative;
  margin: 40px 0;
  width: 50%;
  display: flex;
  align-items: center;
}

.tech-evolution-item:nth-child(odd) {
  left: 0;
  padding-right: 40px;
  flex-direction: row;
}

.tech-evolution-item:nth-child(even) {
  left: 50%;
  padding-left: 40px;
  flex-direction: row-reverse;
}

.tech-evolution-item::before {
  content: '';
  position: absolute;
  top: 50%;
  width: 15px;
  height: 15px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 3px solid var(--body-bg);
  transform: translateY(-50%);
}

.tech-evolution-item:nth-child(odd)::before {
  right: -7px;
}

.tech-evolution-item:nth-child(even)::before {
  left: -7px;
}

.tech-year {
  background: var(--primary-color);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0 20px;
  flex-shrink: 0;
}

.tech-content {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.tech-tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
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
  
  .timeline-tech::before {
    left: 20px;
  }
  
  .tech-evolution-item {
    width: 100%;
    left: 0 !important;
    padding-left: 60px !important;
    padding-right: 0 !important;
    flex-direction: row !important;
  }
  
  .tech-evolution-item::before {
    left: 10px !important;
    right: auto !important;
  }
  
  .tech-year {
    margin: 0 10px 0 0;
  }
}
</style>
