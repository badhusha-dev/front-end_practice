import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from '../authStore'

// Mock fetch
global.fetch = vi.fn()

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.getState().logout()
    vi.clearAllMocks()
  })

  it('should initialize with empty auth state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it('should handle successful login', async () => {
    const mockResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        role: 'user',
        firstName: 'Test',
        lastName: 'User'
      },
      token: 'mock-token'
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    const result = await useAuthStore.getState().login('test@example.com', 'password')

    expect(result.success).toBe(true)
    expect(result.user).toEqual(mockResponse.user)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockResponse.user)
    expect(state.token).toBe('mock-token')
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it('should handle failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' })
    })

    const result = await useAuthStore.getState().login('test@example.com', 'wrongpassword')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid credentials')

    const state = useAuthStore.getState()
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it('should handle network error during login', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    const result = await useAuthStore.getState().login('test@example.com', 'password')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Network error occurred')

    const state = useAuthStore.getState()
    expect(state.isLoading).toBe(false)
  })

  it('should handle successful registration', async () => {
    const userData = {
      email: 'newuser@example.com',
      password: 'password',
      firstName: 'New',
      lastName: 'User'
    }

    const mockResponse = {
      user: {
        id: '2',
        email: 'newuser@example.com',
        role: 'user',
        firstName: 'New',
        lastName: 'User'
      },
      token: 'mock-token'
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    const result = await useAuthStore.getState().register(userData)

    expect(result.success).toBe(true)
    expect(result.user).toEqual(mockResponse.user)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockResponse.user)
    expect(state.token).toBe('mock-token')
    expect(state.isAuthenticated).toBe(true)
  })

  it('should logout user', () => {
    // First login a user
    useAuthStore.setState({
      user: { id: '1', email: 'test@example.com' },
      token: 'mock-token',
      isAuthenticated: true,
      isLoading: false
    })

    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it('should check if user is admin', () => {
    // Test with non-admin user
    useAuthStore.setState({
      user: { id: '1', email: 'test@example.com', role: 'user' }
    })
    expect(useAuthStore.getState().isAdmin()).toBe(false)

    // Test with admin user
    useAuthStore.setState({
      user: { id: '2', email: 'admin@example.com', role: 'admin' }
    })
    expect(useAuthStore.getState().isAdmin()).toBe(true)

    // Test with no user
    useAuthStore.setState({ user: null })
    expect(useAuthStore.getState().isAdmin()).toBe(null)
  })

  it('should initialize auth from stored token', () => {
    // Mock valid token
    const validToken = btoa(JSON.stringify({ userId: '1', role: 'user' }))
    
    useAuthStore.setState({
      user: { id: '1', email: 'test@example.com', role: 'user' },
      token: validToken
    })

    const result = useAuthStore.getState().initializeAuth()
    expect(result).toBe(true)

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
  })

  it('should handle invalid token during initialization', () => {
    // Mock invalid token
    const invalidToken = 'invalid-token'
    
    useAuthStore.setState({
      user: { id: '1', email: 'test@example.com', role: 'user' },
      token: invalidToken
    })

    const result = useAuthStore.getState().initializeAuth()
    expect(result).toBe(false)

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBe(null)
    expect(state.token).toBe(null)
  })

  it('should update user profile', () => {
    const initialUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    }

    useAuthStore.setState({ user: initialUser })

    const updates = { firstName: 'Updated', lastName: 'Name' }
    useAuthStore.getState().updateProfile(updates)

    const state = useAuthStore.getState()
    expect(state.user).toEqual({
      id: '1',
      email: 'test@example.com',
      firstName: 'Updated',
      lastName: 'Name'
    })
  })
})
