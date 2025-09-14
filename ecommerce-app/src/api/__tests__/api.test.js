import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock axios completely
const mockAxios = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() }
  }
}

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxios)
  }
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
global.localStorage = localStorageMock

describe('API Functions', () => {
  let authAPI, productsAPI, ordersAPI, analyticsAPI

  beforeEach(async () => {
    vi.clearAllMocks()
    // Import API functions after mocking
    const api = await import('../api')
    authAPI = api.authAPI
    productsAPI = api.productsAPI
    ordersAPI = api.ordersAPI
    analyticsAPI = api.analyticsAPI
  })

  describe('authAPI', () => {
    it('should call login endpoint', async () => {
      const credentials = { email: 'test@example.com', password: 'password' }
      const mockResponse = { data: { user: {}, token: 'mock-token' } }
      
      mockAxios.post.mockResolvedValueOnce(mockResponse)
      
      await authAPI.login(credentials)
      
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/login', credentials)
    })

    it('should call register endpoint', async () => {
      const userData = { email: 'test@example.com', password: 'password', firstName: 'Test', lastName: 'User' }
      const mockResponse = { data: { user: {}, token: 'mock-token' } }
      
      mockAxios.post.mockResolvedValueOnce(mockResponse)
      
      await authAPI.register(userData)
      
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/register', userData)
    })
  })

  describe('productsAPI', () => {
    it('should call get all products endpoint', async () => {
      const mockResponse = { data: { products: [] } }
      
      mockAxios.get.mockResolvedValueOnce(mockResponse)
      
      await productsAPI.getAll()
      
      expect(mockAxios.get).toHaveBeenCalledWith('/products')
    })

    it('should call get product by id endpoint', async () => {
      const mockResponse = { data: { product: {} } }
      
      mockAxios.get.mockResolvedValueOnce(mockResponse)
      
      await productsAPI.getById('1')
      
      expect(mockAxios.get).toHaveBeenCalledWith('/products/1')
    })

    it('should call get products by category endpoint', async () => {
      const mockResponse = { data: { products: [] } }
      
      mockAxios.get.mockResolvedValueOnce(mockResponse)
      
      await productsAPI.getByCategory('electronics')
      
      expect(mockAxios.get).toHaveBeenCalledWith('/products/category/electronics')
    })

    it('should call get categories endpoint', async () => {
      const mockResponse = { data: { categories: [] } }
      
      mockAxios.get.mockResolvedValueOnce(mockResponse)
      
      await productsAPI.getCategories()
      
      expect(mockAxios.get).toHaveBeenCalledWith('/categories')
    })

    it('should call create product endpoint (admin)', async () => {
      const productData = { name: 'Test Product', price: 29.99 }
      const mockResponse = { data: { product: {} } }
      
      mockAxios.post.mockResolvedValueOnce(mockResponse)
      
      await productsAPI.create(productData)
      
      expect(mockAxios.post).toHaveBeenCalledWith('/admin/products', productData)
    })

    it('should call update product endpoint (admin)', async () => {
      const productData = { name: 'Updated Product' }
      const mockResponse = { data: { product: {} } }
      
      mockAxios.put.mockResolvedValueOnce(mockResponse)
      
      await productsAPI.update('1', productData)
      
      expect(mockAxios.put).toHaveBeenCalledWith('/admin/products/1', productData)
    })

    it('should call delete product endpoint (admin)', async () => {
      mockAxios.delete.mockResolvedValueOnce({ data: {} })
      
      await productsAPI.delete('1')
      
      expect(mockAxios.delete).toHaveBeenCalledWith('/admin/products/1')
    })
  })

  describe('ordersAPI', () => {
    it('should call get all orders endpoint', async () => {
      const mockResponse = { data: { orders: [] } }
      
      mockAxios.get.mockResolvedValueOnce(mockResponse)
      
      await ordersAPI.getAll()
      
      expect(mockAxios.get).toHaveBeenCalledWith('/orders', { params: {} })
    })

    it('should call get orders by user id endpoint', async () => {
      const mockResponse = { data: { orders: [] } }
      
      mockAxios.get.mockResolvedValueOnce(mockResponse)
      
      await ordersAPI.getAll('1')
      
      expect(mockAxios.get).toHaveBeenCalledWith('/orders', { params: { userId: '1' } })
    })

    it('should call create order endpoint', async () => {
      const orderData = { items: [], total: 100 }
      const mockResponse = { data: { order: {} } }
      
      mockAxios.post.mockResolvedValueOnce(mockResponse)
      
      await ordersAPI.create(orderData)
      
      expect(mockAxios.post).toHaveBeenCalledWith('/orders', orderData)
    })

    it('should call update order status endpoint (admin)', async () => {
      const mockResponse = { data: { order: {} } }
      
      mockAxios.put.mockResolvedValueOnce(mockResponse)
      
      await ordersAPI.updateStatus('1', 'shipped')
      
      expect(mockAxios.put).toHaveBeenCalledWith('/admin/orders/1', { status: 'shipped' })
    })
  })

  describe('analyticsAPI', () => {
    it('should call get analytics endpoint (admin)', async () => {
      const mockResponse = { data: { analytics: {} } }
      
      mockAxios.get.mockResolvedValueOnce(mockResponse)
      
      await analyticsAPI.getAnalytics()
      
      expect(mockAxios.get).toHaveBeenCalledWith('/admin/analytics')
    })
  })
})
