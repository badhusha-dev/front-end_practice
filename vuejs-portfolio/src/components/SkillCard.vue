<template>
  <div class="skill-card card card-custom h-100" :class="{ 'animate__animated animate__fadeInUp': isVisible }">
    <div class="card-body">
      <h5 class="card-title text-center mb-4">{{ category }}</h5>
      
      <div class="skills-list">
        <div 
          v-for="skill in skills" 
          :key="skill.name" 
          class="skill-item"
        >
          <div class="skill-header d-flex justify-content-between align-items-center mb-2">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-level">{{ skill.level }}%</span>
          </div>
          
          <div class="progress progress-custom">
            <div 
              class="progress-bar progress-bar-custom" 
              :style="{ width: skill.level + '%' }"
              :data-width="skill.level"
            ></div>
          </div>
          
          <div class="skill-meta mt-1">
            <small class="text-muted">{{ skill.years }} years experience</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillCard',
  props: {
    category: {
      type: String,
      required: true
    },
    skills: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    this.observeElement()
  },
  methods: {
    observeElement() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible = true
              this.animateProgressBars()
            }
          })
        },
        { threshold: 0.1 }
      )
      
      observer.observe(this.$el)
    },
    animateProgressBars() {
      const progressBars = this.$el.querySelectorAll('.progress-bar-custom')
      progressBars.forEach((bar, index) => {
        setTimeout(() => {
          const width = bar.getAttribute('data-width')
          bar.style.width = width + '%'
        }, index * 100)
      })
    }
  }
}
</script>

<style scoped>
.skill-card {
  background: var(--card-bg);
  color: var(--text-color);
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.skill-card .card-title {
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.1rem;
}

.skill-item {
  margin-bottom: 25px;
}

.skill-item:last-child {
  margin-bottom: 0;
}

.skill-header {
  margin-bottom: 8px;
}

.skill-name {
  font-weight: 500;
  color: var(--text-color);
}

.skill-level {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.9rem;
}

.progress-custom {
  height: 8px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.progress-bar-custom {
  background: linear-gradient(45deg, var(--primary-color), var(--info-color));
  border-radius: 10px;
  transition: width 1.5s ease;
  width: 0% !important;
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skills-list {
  padding: 0 10px;
}

@media (max-width: 768px) {
  .skill-card {
    margin-bottom: 30px;
  }
  
  .skill-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .skill-level {
    margin-top: 5px;
  }
}
</style>
