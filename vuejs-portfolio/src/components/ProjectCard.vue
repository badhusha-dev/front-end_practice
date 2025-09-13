<template>
  <div class="project-card card card-custom h-100" @click="openModal">
    <img :src="project.image" class="card-img-top project-image" :alt="project.title">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ project.title }}</h5>
      <p class="card-text flex-grow-1">{{ project.description }}</p>
      
      <div class="project-tech">
        <span 
          v-for="tech in project.techStack.slice(0, 4)" 
          :key="tech" 
          class="tech-tag"
        >
          {{ tech }}
        </span>
        <span v-if="project.techStack.length > 4" class="tech-tag">
          +{{ project.techStack.length - 4 }} more
        </span>
      </div>
      
      <div class="project-links mt-3">
        <a 
          :href="project.link" 
          target="_blank" 
          class="btn btn-sm btn-outline-primary me-2"
          @click.stop
        >
          <i class="fab fa-github me-1"></i>Code
        </a>
        <a 
          v-if="project.demoLink" 
          :href="project.demoLink" 
          target="_blank" 
          class="btn btn-sm btn-primary"
          @click.stop
        >
          <i class="fas fa-external-link-alt me-1"></i>Demo
        </a>
      </div>
      
      <div class="project-status mt-2">
        <span 
          class="badge"
          :class="{
            'bg-success': project.status === 'Completed',
            'bg-warning': project.status === 'In Progress',
            'bg-info': project.status === 'Planned'
          }"
        >
          {{ project.status }}
        </span>
        <span class="text-muted ms-2">{{ project.year }}</span>
      </div>
    </div>
  </div>

  <!-- Project Modal -->
  <div 
    class="modal fade" 
    :id="`projectModal${project.id}`" 
    tabindex="-1" 
    aria-labelledby="projectModalLabel" 
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="projectModalLabel">{{ project.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="project.image" class="img-fluid rounded mb-3" :alt="project.title">
          
          <h6>Description</h6>
          <p>{{ project.longDescription }}</p>
          
          <h6>Key Features</h6>
          <ul>
            <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
          </ul>
          
          <h6>Technologies Used</h6>
          <div class="project-tech">
            <span 
              v-for="tech in project.techStack" 
              :key="tech" 
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <a :href="project.link" target="_blank" class="btn btn-primary">
            <i class="fab fa-github me-1"></i>View Code
          </a>
          <a 
            v-if="project.demoLink" 
            :href="project.demoLink" 
            target="_blank" 
            class="btn btn-success"
          >
            <i class="fas fa-external-link-alt me-1"></i>Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    openModal() {
      const modal = new bootstrap.Modal(document.getElementById(`projectModal${this.project.id}`))
      modal.show()
    }
  }
}
</script>

<style scoped>
.project-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.project-image {
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.project-tech {
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

.project-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.project-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-content {
  border-radius: 15px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-color);
}

.modal-body {
  background: var(--body-bg);
  color: var(--text-color);
}

.modal-footer {
  border-top: 1px solid var(--border-color);
  background: var(--card-bg);
}

@media (max-width: 768px) {
  .project-links {
    flex-direction: column;
  }
  
  .project-links .btn {
    width: 100%;
  }
}
</style>
