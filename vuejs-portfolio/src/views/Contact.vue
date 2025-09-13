<template>
  <div class="contact-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header text-center py-5">
        <h1 class="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">Get In Touch</h1>
        <p class="lead animate__animated animate__fadeInUp animate__delay-1s">Let's discuss your next project</p>
      </div>

      <div class="row">
        <!-- Contact Information -->
        <div class="col-lg-4 mb-5">
          <div class="contact-info-card card card-custom h-100 animate__animated animate__fadeInLeft">
            <div class="card-body">
              <h3 class="card-title mb-4">Contact Information</h3>
              
              <div class="contact-item mb-4">
                <div class="contact-icon">
                  <i class="fas fa-envelope text-primary"></i>
                </div>
                <div class="contact-details">
                  <h6>Email</h6>
                  <a :href="`mailto:${personalInfo.email}`" class="text-decoration-none">{{ personalInfo.email }}</a>
                </div>
              </div>

              <div class="contact-item mb-4">
                <div class="contact-icon">
                  <i class="fas fa-phone text-primary"></i>
                </div>
                <div class="contact-details">
                  <h6>Phone</h6>
                  <a :href="`tel:${personalInfo.phone}`" class="text-decoration-none">{{ personalInfo.phone }}</a>
                </div>
              </div>

              <div class="contact-item mb-4">
                <div class="contact-icon">
                  <i class="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div class="contact-details">
                  <h6>Location</h6>
                  <span>{{ personalInfo.location }}</span>
                </div>
              </div>

              <div class="contact-item mb-4">
                <div class="contact-icon">
                  <i class="fas fa-clock text-primary"></i>
                </div>
                <div class="contact-details">
                  <h6>Availability</h6>
                  <span>Mon - Fri, 9:00 AM - 6:00 PM IST</span>
                </div>
              </div>

              <hr class="my-4">

              <h5 class="mb-3">Follow Me</h5>
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
        </div>

        <!-- Contact Form -->
        <div class="col-lg-8 mb-5">
          <div class="contact-form-card card card-custom animate__animated animate__fadeInRight">
            <div class="card-body">
              <h3 class="card-title mb-4">Send Me a Message</h3>
              
              <form @submit.prevent="submitForm" class="contact-form">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Name *</label>
                    <input 
                      type="text" 
                      class="form-control form-control-custom" 
                      id="name"
                      v-model="form.name"
                      :class="{ 'is-invalid': errors.name }"
                      required
                    >
                    <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">Email *</label>
                    <input 
                      type="email" 
                      class="form-control form-control-custom" 
                      id="email"
                      v-model="form.email"
                      :class="{ 'is-invalid': errors.email }"
                      required
                    >
                    <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input 
                      type="tel" 
                      class="form-control form-control-custom" 
                      id="phone"
                      v-model="form.phone"
                    >
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="subject" class="form-label">Subject *</label>
                    <input 
                      type="text" 
                      class="form-control form-control-custom" 
                      id="subject"
                      v-model="form.subject"
                      :class="{ 'is-invalid': errors.subject }"
                      required
                    >
                    <div v-if="errors.subject" class="invalid-feedback">{{ errors.subject }}</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="message" class="form-label">Message *</label>
                  <textarea 
                    class="form-control form-control-custom" 
                    id="message"
                    rows="6"
                    v-model="form.message"
                    :class="{ 'is-invalid': errors.message }"
                    required
                  ></textarea>
                  <div v-if="errors.message" class="invalid-feedback">{{ errors.message }}</div>
                </div>

                <div class="mb-3">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="newsletter"
                      v-model="form.newsletter"
                    >
                    <label class="form-check-label" for="newsletter">
                      Subscribe to my newsletter for updates and tech insights
                    </label>
                  </div>
                </div>

                <div class="d-grid">
                  <button 
                    type="submit" 
                    class="btn btn-primary-custom btn-custom"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting" class="loading me-2"></span>
                    <i v-else class="fas fa-paper-plane me-2"></i>
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>

              <!-- Success Message -->
              <div v-if="showSuccess" class="alert alert-success mt-3 animate__animated animate__fadeIn">
                <i class="fas fa-check-circle me-2"></i>
                Thank you! Your message has been sent successfully. I'll get back to you soon.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="additional-info card card-custom animate__animated animate__fadeInUp">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Why Work With Me?</h3>
              <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="info-item text-center">
                    <div class="info-icon mb-3">
                      <i class="fas fa-rocket fa-3x text-primary"></i>
                    </div>
                    <h5>Fast Delivery</h5>
                    <p class="text-muted">Quick turnaround times without compromising quality</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="info-item text-center">
                    <div class="info-icon mb-3">
                      <i class="fas fa-shield-alt fa-3x text-primary"></i>
                    </div>
                    <h5>Quality Assurance</h5>
                    <p class="text-muted">Thorough testing and code reviews for reliable solutions</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="info-item text-center">
                    <div class="info-icon mb-3">
                      <i class="fas fa-headset fa-3x text-primary"></i>
                    </div>
                    <h5>24/7 Support</h5>
                    <p class="text-muted">Ongoing support and maintenance for your projects</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                  <div class="info-item text-center">
                    <div class="info-icon mb-3">
                      <i class="fas fa-handshake fa-3x text-primary"></i>
                    </div>
                    <h5>Collaborative Approach</h5>
                    <p class="text-muted">Working closely with clients to achieve their goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Response Time -->
      <div class="row mt-5">
        <div class="col-12 text-center">
          <div class="response-time animate__animated animate__fadeInUp">
            <h4 class="mb-3">Response Time</h4>
            <p class="lead">I typically respond to inquiries within 24 hours</p>
            <div class="response-stats">
              <div class="row">
                <div class="col-md-4">
                  <div class="stat-item">
                    <h5 class="text-primary">2-4 hours</h5>
                    <p class="text-muted">Email Response</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="stat-item">
                    <h5 class="text-primary">1-2 days</h5>
                    <p class="text-muted">Project Quote</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="stat-item">
                    <h5 class="text-primary">1 week</h5>
                    <p class="text-muted">Project Start</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { personalInfo } from '../data/personal.js'

export default {
  name: 'Contact',
  data() {
    return {
      personalInfo,
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      errors: {},
      isSubmitting: false,
      showSuccess: false
    }
  },
  methods: {
    validateForm() {
      this.errors = {}
      
      if (!this.form.name.trim()) {
        this.errors.name = 'Name is required'
      }
      
      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required'
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
      }
      
      if (!this.form.subject.trim()) {
        this.errors.subject = 'Subject is required'
      }
      
      if (!this.form.message.trim()) {
        this.errors.message = 'Message is required'
      } else if (this.form.message.trim().length < 10) {
        this.errors.message = 'Message must be at least 10 characters long'
      }
      
      return Object.keys(this.errors).length === 0
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    async submitForm() {
      if (!this.validateForm()) {
        return
      }
      
      this.isSubmitting = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Reset form
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          newsletter: false
        }
        
        this.showSuccess = true
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccess = false
        }, 5000)
        
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error sending your message. Please try again.')
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color), var(--info-color));
  color: white;
  margin: -20px -15px 0;
  border-radius: 0 0 20px 20px;
}

.contact-info-card,
.contact-form-card {
  background: var(--card-bg);
  color: var(--text-color);
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.contact-icon {
  width: 40px;
  height: 40px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-details h6 {
  margin-bottom: 5px;
  font-weight: 600;
}

.contact-details a {
  color: var(--text-color);
  transition: color 0.3s ease;
}

.contact-details a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
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

.form-control-custom {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;
  background: var(--body-bg);
  color: var(--text-color);
}

.form-control-custom:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control-custom.is-invalid {
  border-color: var(--danger-color);
}

.loading {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.additional-info {
  background: var(--card-bg);
  color: var(--text-color);
}

.info-item {
  padding: 20px;
  background: rgba(0, 123, 255, 0.05);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(0, 123, 255, 0.1);
  transform: translateY(-5px);
}

.info-icon {
  margin-bottom: 15px;
}

.response-time {
  background: var(--light-color);
  padding: 40px;
  border-radius: 15px;
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

@media (max-width: 768px) {
  .page-header {
    margin: -20px -15px 0;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-icon {
    align-self: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .response-time {
    padding: 30px 20px;
  }
}
</style>
