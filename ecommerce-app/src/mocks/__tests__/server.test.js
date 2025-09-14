import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { makeServer } from '../server'

describe('MirageJS Server', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  describe('Authentication Routes', () => {
    it('should login with valid credentials', async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'admin123'
        })
      })

      const data = await response.json()
      expect(response.ok).toBe(true)
      expect(data.user).toMatchObject({
        id: '1',
        email: 'admin@example.com',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      })
      expect(data.token).toBeDefined()
    })

    it('should reject invalid credentials', async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'wrongpassword'
        })
      })

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Invalid credentials')
    })

    it('should register new user', async () => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'newuser@example.com',
          password: 'password123',
          firstName: 'New',
          lastName: 'User'
        })
      })

      const data = await response.json()
      expect(response.ok).toBe(true)
      expect(data.user).toMatchObject({
        email: 'newuser@example.com',
        role: 'user',
        firstName: 'New',
        lastName: 'User'
      })
      expect(data.token).toBeDefined()
    })

    it('should reject duplicate email registration', async () => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        })
      })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('User already exists')
    })
  })

  describe('Products Routes', () => {
    it('should get all products', async () => {
      const response = await fetch('/api/products')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
      expect(data.products.length).toBeGreaterThan(0)
    })

    it('should get product by id', async () => {
      const response = await fetch('/api/products/1')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.product).toBeDefined()
      expect(data.product.id).toBe('1')
    })

    it('should return 404 for non-existent product', async () => {
      const response = await fetch('/api/products/999')
      expect(response.status).toBe(404)
    })

    it('should get products by category', async () => {
      const response = await fetch('/api/products/category/Electronics')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.products).toBeDefined()
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('should get categories', async () => {
      const response = await fetch('/api/categories')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.categories).toBeDefined()
      expect(Array.isArray(data.categories)).toBe(true)
    })
  })

  describe('Orders Routes', () => {
    it('should get all orders', async () => {
      const response = await fetch('/api/orders')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.orders).toBeDefined()
      expect(Array.isArray(data.orders)).toBe(true)
    })

    it('should get orders by user id', async () => {
      const response = await fetch('/api/orders?userId=2')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.orders).toBeDefined()
      expect(Array.isArray(data.orders)).toBe(true)
    })

    it('should create new order', async () => {
      const orderData = {
        userId: '2',
        items: [
          { productId: '1', quantity: 2, price: 199.99 }
        ],
        total: 399.98,
        shippingAddress: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'USA'
        }
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()
      expect(response.ok).toBe(true)
      expect(data.order).toBeDefined()
      expect(data.order.status).toBe('pending')
    })
  })

  describe('Analytics Routes', () => {
    it('should get analytics data', async () => {
      const response = await fetch('/api/admin/analytics')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.monthlySales).toBeDefined()
      expect(data.topProducts).toBeDefined()
      expect(data.recentOrders).toBeDefined()
      expect(Array.isArray(data.monthlySales)).toBe(true)
      expect(Array.isArray(data.topProducts)).toBe(true)
      expect(Array.isArray(data.recentOrders)).toBe(true)
    })
  })
})
