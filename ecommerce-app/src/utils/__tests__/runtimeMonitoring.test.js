import { describe, it, expect, beforeEach, vi } from 'vitest';
import errorHandler, { performanceMonitor, memoryMonitor } from '../../utils/runtimeMonitoring';

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    memory: {
      usedJSHeapSize: 1000000,
      totalJSHeapSize: 2000000,
      jsHeapSizeLimit: 4000000
    },
    getEntriesByType: vi.fn(() => [{
      loadEventEnd: 1000,
      loadEventStart: 500,
      domContentLoadedEventEnd: 800,
      domContentLoadedEventStart: 600
    }]),
    getEntriesByName: vi.fn(() => [{ startTime: 200 }])
  },
  writable: true
});

// Mock PerformanceObserver
global.PerformanceObserver = class PerformanceObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
};

describe('Runtime Monitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    errorHandler.clearErrors();
  });

  describe('ErrorHandler', () => {
    it('should initialize with empty errors array', () => {
      const errors = errorHandler.getErrors();
      expect(errors).toEqual([]);
    });

    it('should handle JavaScript errors', () => {
      const errorEvent = new ErrorEvent('error', {
        message: 'Test error',
        filename: 'test.js',
        lineno: 10,
        colno: 5,
        error: new Error('Test error')
      });

      // Simulate error event
      errorHandler.handleError({
        type: 'javascript',
        message: errorEvent.message,
        filename: errorEvent.filename,
        lineno: errorEvent.lineno,
        colno: errorEvent.colno,
        error: errorEvent.error,
        timestamp: new Date().toISOString()
      });

      const errors = errorHandler.getErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0].type).toBe('javascript');
      expect(errors[0].message).toBe('Test error');
    });

    it('should handle promise rejections', () => {
      errorHandler.handleError({
        type: 'promise',
        message: 'Unhandled promise rejection',
        reason: new Error('Promise error'),
        timestamp: new Date().toISOString()
      });

      const errors = errorHandler.getErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0].type).toBe('promise');
    });

    it('should handle resource loading errors', () => {
      errorHandler.handleError({
        type: 'resource',
        message: 'Failed to load IMG',
        src: 'test.jpg',
        timestamp: new Date().toISOString()
      });

      const errors = errorHandler.getErrors();
      expect(errors).toHaveLength(1);
      expect(errors[0].type).toBe('resource');
    });

    it('should identify critical errors', () => {
      const criticalError = {
        type: 'javascript',
        message: 'ChunkLoadError: Loading chunk failed',
        timestamp: new Date().toISOString()
      };

      const isCritical = errorHandler.isCriticalError(criticalError);
      expect(isCritical).toBe(true);
    });

    it('should not identify non-critical errors as critical', () => {
      const normalError = {
        type: 'javascript',
        message: 'Regular JavaScript error',
        timestamp: new Date().toISOString()
      };

      const isCritical = errorHandler.isCriticalError(normalError);
      expect(isCritical).toBe(false);
    });

    it('should limit errors to maxErrors', () => {
      // Add more errors than the limit
      for (let i = 0; i < 150; i++) {
        errorHandler.handleError({
          type: 'javascript',
          message: `Error ${i}`,
          timestamp: new Date().toISOString()
        });
      }

      const errors = errorHandler.getErrors();
      expect(errors).toHaveLength(100); // Should be limited to maxErrors
    });

    it('should get error stats', () => {
      errorHandler.handleError({
        type: 'javascript',
        message: 'JS Error',
        timestamp: new Date().toISOString()
      });

      errorHandler.handleError({
        type: 'promise',
        message: 'Promise Error',
        timestamp: new Date().toISOString()
      });

      const stats = errorHandler.getErrorStats();
      expect(stats.total).toBe(2);
      expect(stats.byType.javascript).toBe(1);
      expect(stats.byType.promise).toBe(1);
      expect(stats.recent).toHaveLength(2);
    });

    it('should clear errors', () => {
      errorHandler.handleError({
        type: 'javascript',
        message: 'Test error',
        timestamp: new Date().toISOString()
      });

      expect(errorHandler.getErrors()).toHaveLength(1);

      errorHandler.clearErrors();
      expect(errorHandler.getErrors()).toHaveLength(0);
    });
  });

  describe('PerformanceMonitor', () => {
    it('should initialize with empty metrics', () => {
      const metrics = performanceMonitor.getMetrics();
      expect(metrics).toEqual([]);
    });

    it('should get performance score', () => {
      const score = performanceMonitor.getPerformanceScore();
      
      expect(score).toBeDefined();
      expect(score.loadTime).toBeDefined();
      expect(score.domContentLoaded).toBeDefined();
      expect(score.firstPaint).toBeDefined();
      expect(score.firstContentfulPaint).toBeDefined();
    });
  });

  describe('MemoryMonitor', () => {
    it('should initialize with empty memory stats', () => {
      const stats = memoryMonitor.getMemoryStats();
      expect(stats).toEqual([]);
    });

    it('should get current memory usage', () => {
      const usage = memoryMonitor.getCurrentMemoryUsage();
      
      expect(usage).toBeDefined();
      expect(usage.used).toBeDefined();
      expect(usage.total).toBeDefined();
      expect(usage.limit).toBeDefined();
      expect(usage.percentage).toBeDefined();
    });
  });
});
