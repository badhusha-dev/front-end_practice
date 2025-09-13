<template>
  <div class="skills-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header text-center py-5">
        <h1 class="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">Skills & Expertise</h1>
        <p class="lead animate__animated animate__fadeInUp animate__delay-1s">Technologies and tools I work with</p>
      </div>

      <!-- Skills Overview -->
      <div class="skills-overview mb-5">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4" v-for="(category, categoryName) in skillsOverview" :key="categoryName">
            <div class="overview-card text-center animate__animated animate__fadeInUp" :style="{ animationDelay: (Object.keys(skillsOverview).indexOf(categoryName) * 0.1) + 's' }">
              <div class="overview-icon mb-3">
                <i :class="category.icon" class="fas fa-3x text-primary"></i>
              </div>
              <h4>{{ categoryName.charAt(0).toUpperCase() + categoryName.slice(1) }}</h4>
              <p class="text-muted">{{ category.count }} skills</p>
              <div class="overview-skills">
                <span 
                  v-for="skill in category.skills.slice(0, 3)" 
                  :key="skill" 
                  class="skill-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Categories -->
      <div class="skills-categories">
        <div class="row">
          <div 
            v-for="(category, categoryName) in skills" 
            :key="categoryName"
            class="col-lg-6 mb-5"
          >
            <SkillCard 
              :category="categoryName.charAt(0).toUpperCase() + categoryName.slice(1)"
              :skills="category"
            />
          </div>
        </div>
      </div>

      <!-- Skills Summary -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Skills Summary</h3>
              <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-code fa-3x text-primary"></i>
                    </div>
                    <h4>{{ totalSkills }}</h4>
                    <p class="text-muted">Total Skills</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-star fa-3x text-warning"></i>
                    </div>
                    <h4>{{ expertSkills }}</h4>
                    <p class="text-muted">Expert Level (90%+)</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-chart-line fa-3x text-success"></i>
                    </div>
                    <h4>{{ advancedSkills }}</h4>
                    <p class="text-muted">Advanced Level (80%+)</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="summary-item text-center">
                    <div class="summary-icon mb-3">
                      <i class="fas fa-calendar-alt fa-3x text-info"></i>
                    </div>
                    <h4>{{ averageExperience }}</h4>
                    <p class="text-muted">Avg. Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Journey -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="text-center mb-4">Learning Journey</h3>
          <div class="card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <div class="learning-timeline">
                <div 
                  v-for="(phase, index) in learningJourney" 
                  :key="index"
                  class="learning-phase"
                  :class="{ 'animate__animated animate__fadeInLeft': index % 2 === 0, 'animate__animated animate__fadeInRight': index % 2 === 1 }"
                  :style="{ animationDelay: (index * 0.2) + 's' }"
                >
                  <div class="phase-year">{{ phase.year }}</div>
                  <div class="phase-content">
                    <h6>{{ phase.title }}</h6>
                    <p>{{ phase.description }}</p>
                    <div class="phase-skills">
                      <span 
                        v-for="skill in phase.skills" 
                        :key="skill" 
                        class="skill-tag"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="text-center mb-4">Certifications & Achievements</h3>
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" v-for="(cert, index) in certifications" :key="index">
              <div class="certification-card card card-custom h-100 animate__animated animate__fadeInUp" :style="{ animationDelay: (index * 0.1) + 's' }">
                <div class="card-body text-center">
                  <div class="cert-icon mb-3">
                    <i :class="cert.icon" class="fas fa-3x text-primary"></i>
                  </div>
                  <h5 class="card-title">{{ cert.title }}</h5>
                  <p class="card-text">{{ cert.issuer }}</p>
                  <small class="text-muted">{{ cert.date }}</small>
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
            <h3 class="mb-3">Ready to Collaborate?</h3>
            <p class="lead mb-4">Let's discuss how my skills can contribute to your project</p>
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
import SkillCard from '../components/SkillCard.vue'
import { skills } from '../data/skills.js'

export default {
  name: 'Skills',
  components: {
    SkillCard
  },
  data() {
    return {
      skills,
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
      },
      learningJourney: [
        {
          year: '2019',
          title: 'Foundation',
          description: 'Started with core Java programming and object-oriented concepts',
          skills: ['Java 8', 'OOP', 'Data Structures', 'Algorithms']
        },
        {
          year: '2020',
          title: 'Web Development',
          description: 'Learned Spring Framework and web application development',
          skills: ['Spring MVC', 'Spring Boot', 'REST APIs', 'MySQL']
        },
        {
          year: '2021',
          title: 'Advanced Backend',
          description: 'Mastered microservices architecture and cloud technologies',
          skills: ['Spring Cloud', 'Docker', 'AWS', 'Microservices']
        },
        {
          year: '2022',
          title: 'DevOps & Cloud',
          description: 'Explored containerization and cloud deployment strategies',
          skills: ['Kubernetes', 'Jenkins', 'CI/CD', 'Linux']
        },
        {
          year: '2023',
          title: 'Modern Technologies',
          description: 'Adopted modern Java features and advanced patterns',
          skills: ['Java 11', 'GraphQL', 'Redis', 'Apache Kafka']
        },
        {
          year: '2024',
          title: 'Innovation & Leadership',
          description: 'Leading teams and exploring cutting-edge technologies',
          skills: ['Java 17', 'Quarkus', 'Apache Pulsar', 'Istio']
        }
      ],
      certifications: [
        {
          title: 'Oracle Certified Java Developer',
          issuer: 'Oracle Corporation',
          date: '2021',
          icon: 'fa-certificate'
        },
        {
          title: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2022',
          icon: 'fa-cloud'
        },
        {
          title: 'Spring Professional Certification',
          issuer: 'VMware',
          date: '2023',
          icon: 'fa-leaf'
        },
        {
          title: 'Docker Certified Associate',
          issuer: 'Docker Inc.',
          date: '2023',
          icon: 'fa-docker'
        },
        {
          title: 'Kubernetes Administrator',
          issuer: 'Cloud Native Computing Foundation',
          date: '2024',
          icon: 'fa-cube'
        },
        {
          title: 'Agile Project Management',
          issuer: 'Scrum Alliance',
          date: '2024',
          icon: 'fa-project-diagram'
        }
      ]
    }
  },
  computed: {
    totalSkills() {
      return Object.values(this.skills).reduce((total, category) => total + category.length, 0)
    },
    expertSkills() {
      return Object.values(this.skills)
        .flat()
        .filter(skill => skill.level >= 90).length
    },
    advancedSkills() {
      return Object.values(this.skills)
        .flat()
        .filter(skill => skill.level >= 80).length
    },
    averageExperience() {
      const allSkills = Object.values(this.skills).flat()
      const totalYears = allSkills.reduce((sum, skill) => {
        const years = parseFloat(skill.years.replace('+', ''))
        return sum + years
      }, 0)
      return (totalYears / allSkills.length).toFixed(1) + '+ years'
    }
  }
}
</script>

<style scoped>
.skills-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  color: white;
  margin: -20px -15px 0;
  border-radius: 0 0 20px 20px;
}

.overview-card {
  padding: 30px 20px;
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
}

.overview-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.overview-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin-top: 15px;
}

.skill-tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
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

.learning-timeline {
  position: relative;
  padding: 20px 0;
}

.learning-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
  transform: translateX(-50%);
}

.learning-phase {
  position: relative;
  margin: 40px 0;
  width: 50%;
  display: flex;
  align-items: center;
}

.learning-phase:nth-child(odd) {
  left: 0;
  padding-right: 40px;
  flex-direction: row;
}

.learning-phase:nth-child(even) {
  left: 50%;
  padding-left: 40px;
  flex-direction: row-reverse;
}

.learning-phase::before {
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

.learning-phase:nth-child(odd)::before {
  right: -7px;
}

.learning-phase:nth-child(even)::before {
  left: -7px;
}

.phase-year {
  background: var(--primary-color);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0 20px;
  flex-shrink: 0;
}

.phase-content {
  background: var(--card-bg);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.phase-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.certification-card {
  transition: all 0.3s ease;
}

.certification-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.cert-icon {
  margin-bottom: 15px;
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
  
  .learning-timeline::before {
    left: 20px;
  }
  
  .learning-phase {
    width: 100%;
    left: 0 !important;
    padding-left: 60px !important;
    padding-right: 0 !important;
    flex-direction: row !important;
  }
  
  .learning-phase::before {
    left: 10px !important;
    right: auto !important;
  }
  
  .phase-year {
    margin: 0 10px 0 0;
  }
  
  .cta-section {
    padding: 30px 20px;
  }
}
</style>
