<template>
  <div class="timeline-item" :class="{ 'animate__animated animate__fadeInUp': isVisible }">
    <div class="timeline-content card card-custom">
      <div class="card-body">
        <div class="timeline-header d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 class="card-title mb-1">{{ experience.role }}</h5>
            <h6 class="card-subtitle text-primary mb-2">{{ experience.company }}</h6>
          </div>
          <div class="text-end">
            <span class="badge bg-primary">{{ experience.type }}</span>
          </div>
        </div>
        
        <div class="timeline-meta mb-3">
          <div class="row">
            <div class="col-md-6">
              <small class="text-muted">
                <i class="fas fa-calendar me-1"></i>{{ experience.duration }}
              </small>
            </div>
            <div class="col-md-6">
              <small class="text-muted">
                <i class="fas fa-map-marker-alt me-1"></i>{{ experience.location }}
              </small>
            </div>
          </div>
        </div>
        
        <div class="timeline-responsibilities">
          <h6 class="mb-2">Key Responsibilities:</h6>
          <ul class="list-unstyled">
            <li v-for="(responsibility, index) in experience.responsibilities" :key="index" class="mb-2">
              <i class="fas fa-check-circle text-success me-2"></i>{{ responsibility }}
            </li>
          </ul>
        </div>
        
        <div class="timeline-technologies mt-3">
          <h6 class="mb-2">Technologies Used:</h6>
          <div class="tech-tags">
            <span 
              v-for="tech in experience.technologies" 
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
</template>

<script>
export default {
  name: 'TimelineItem',
  props: {
    experience: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
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
              setTimeout(() => {
                this.isVisible = true
              }, this.index * 200)
            }
          })
        },
        { threshold: 0.1 }
      )
      
      observer.observe(this.$el)
    }
  }
}
</script>

<style scoped>
.timeline-item {
  position: relative;
  margin: 40px 0;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  left: 0;
  padding-right: 40px;
}

.timeline-item:nth-child(even) {
  left: 50%;
  padding-left: 40px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 4px solid var(--body-bg);
  z-index: 2;
}

.timeline-item:nth-child(odd)::before {
  right: -10px;
}

.timeline-item:nth-child(even)::before {
  left: -10px;
}

.timeline-content {
  background: var(--card-bg);
  color: var(--text-color);
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.timeline-header h5 {
  color: var(--text-color);
  font-weight: 600;
}

.timeline-header h6 {
  color: var(--primary-color);
  font-weight: 500;
}

.timeline-meta {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 15px;
}

.timeline-responsibilities ul li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.timeline-responsibilities ul li i {
  margin-top: 2px;
  flex-shrink: 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: var(--dark-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 60px !important;
    padding-right: 0 !important;
  }
  
  .timeline-item::before {
    left: 10px !important;
    right: auto !important;
  }
  
  .timeline-meta .row {
    flex-direction: column;
  }
  
  .timeline-meta .col-md-6 {
    margin-bottom: 5px;
  }
}
</style>
