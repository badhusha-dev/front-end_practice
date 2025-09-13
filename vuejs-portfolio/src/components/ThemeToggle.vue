<template>
  <div class="theme-toggle">
    <button 
      class="theme-btn theme-light-btn"
      :class="{ active: currentTheme === 'light' }"
      @click="setTheme('light')"
      title="Light Theme"
    ></button>
    <button 
      class="theme-btn theme-dark-btn"
      :class="{ active: currentTheme === 'dark' }"
      @click="setTheme('dark')"
      title="Dark Theme"
    ></button>
    <button 
      class="theme-btn theme-blue-btn"
      :class="{ active: currentTheme === 'blue' }"
      @click="setTheme('blue')"
      title="Blue Theme"
    ></button>
    <button 
      class="theme-btn theme-green-btn"
      :class="{ active: currentTheme === 'green' }"
      @click="setTheme('green')"
      title="Green Theme"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'ThemeToggle',
  props: {
    currentTheme: {
      type: String,
      required: true
    }
  },
  emits: ['update-theme'],
  methods: {
    setTheme(theme) {
      this.$emit('update-theme', theme)
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 50px;
  padding: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 5px;
}

.theme-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.theme-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.theme-btn:hover::after {
  width: 100%;
  height: 100%;
}

.theme-btn.active {
  transform: scale(1.2);
  box-shadow: 0 0 0 3px var(--primary-color);
}

.theme-light-btn {
  background: #f8f9fa;
  border: 2px solid #dee2e6;
}

.theme-dark-btn {
  background: #343a40;
}

.theme-blue-btn {
  background: #3b82f6;
}

.theme-green-btn {
  background: #22c55e;
}

@media (max-width: 768px) {
  .theme-toggle {
    top: 10px;
    right: 10px;
    padding: 5px;
  }
  
  .theme-btn {
    width: 30px;
    height: 30px;
  }
}
</style>
