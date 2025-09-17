// Global error handler for runtime errors
class RuntimeErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 100;
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    // Handle uncaught JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString()
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        reason: event.reason,
        timestamp: new Date().toISOString()
      });
    });

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleError({
          type: 'resource',
          message: `Failed to load ${event.target.tagName}`,
          src: event.target.src || event.target.href,
          timestamp: new Date().toISOString()
        });
      }
    }, true);
  }

  handleError(errorInfo) {
    // Add to errors array
    this.errors.push(errorInfo);
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Runtime Error:', errorInfo);
    }

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      this.reportError(errorInfo);
    }

    // Show user-friendly error notification for critical errors
    if (this.isCriticalError(errorInfo)) {
      this.showErrorNotification(errorInfo);
    }
  }

  isCriticalError(errorInfo) {
    // Define what constitutes a critical error
    const criticalPatterns = [
      'ChunkLoadError',
      'Loading chunk',
      'Network error',
      'Failed to fetch'
    ];

    return criticalPatterns.some(pattern => 
      errorInfo.message?.includes(pattern)
    );
  }

  showErrorNotification(errorInfo) {
    // Create a non-intrusive error notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <span>⚠️</span>
        <span class="text-sm">Something went wrong. Please refresh the page.</span>
        <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  reportError(errorInfo) {
    // In a real application, you would send this to an error reporting service
    // like Sentry, LogRocket, or Bugsnag
    console.log('Reporting error to service:', errorInfo);
    
    // Example: Send to analytics or error tracking service
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: errorInfo.message,
        fatal: this.isCriticalError(errorInfo)
      });
    }
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }

  getErrorStats() {
    const stats = {
      total: this.errors.length,
      byType: {},
      recent: this.errors.slice(-10)
    };

    this.errors.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
    });

    return stats;
  }
}

// Initialize global error handler
const errorHandler = new RuntimeErrorHandler();

// Export for use in components
export default errorHandler;

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
    this.setupPerformanceObserver();
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.metrics.push({
            name: entry.name,
            type: entry.entryType,
            duration: entry.duration,
            timestamp: Date.now()
          });
        });
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    }
  }

  getMetrics() {
    return this.metrics;
  }

  getPerformanceScore() {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (!navigation) return null;

    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
    };
  }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

export { performanceMonitor };

// Memory usage monitoring
class MemoryMonitor {
  constructor() {
    this.memoryStats = [];
    this.startMonitoring();
  }

  startMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        this.memoryStats.push({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          timestamp: Date.now()
        });
      }, 30000); // Check every 30 seconds
    }
  }

  getMemoryStats() {
    return this.memoryStats;
  }

  getCurrentMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
      };
    }
    return null;
  }
}

// Initialize memory monitoring
const memoryMonitor = new MemoryMonitor();

export { memoryMonitor };
