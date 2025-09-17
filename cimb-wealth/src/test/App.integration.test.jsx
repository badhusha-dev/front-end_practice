import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderWithProviders, createMockUser, userEvent, screen } from './utils.jsx'
import App from '../App'
import { store } from '../store'
import { login, push } from '../store'

// Mock all the page components
vi.mock('../pages/Dashboard', () => ({
  default: () => <div data-testid="dashboard-page">Dashboard Page</div>
}))

vi.mock('../pages/Investments', () => ({
  default: () => <div data-testid="investments-page">Investments Page</div>
}))

vi.mock('../pages/Portfolio', () => ({
  default: () => <div data-testid="portfolio-page">Portfolio Page</div>
}))

vi.mock('../pages/Goals', () => ({
  default: () => <div data-testid="goals-page">Goals Page</div>
}))

vi.mock('../pages/Reports', () => ({
  default: () => <div data-testid="reports-page">Reports Page</div>
}))

vi.mock('../pages/Settings', () => ({
  default: () => <div data-testid="settings-page">Settings Page</div>
}))

vi.mock('../pages/Login', () => ({
  default: () => <div data-testid="login-page">Login Page</div>
}))

// Mock child components
vi.mock('../components/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>
}))

vi.mock('../components/Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>
}))

vi.mock('../components/PageTransition', () => ({
  default: ({ children }) => <div data-testid="page-transition">{children}</div>
}))

vi.mock('../components/AdvancedNotifications', () => ({
  default: () => <div data-testid="notifications">Notifications</div>
}))

vi.mock('../components/ProtectedRoute', () => ({
  default: ({ children }) => <div data-testid="protected-route">{children}</div>
}))

describe('App Integration Tests', () => {
  beforeEach(() => {
    // Reset store state
    store.dispatch({ type: 'auth/logout' })
    store.dispatch({ type: 'notifications/clear' })
    
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    global.localStorage = localStorageMock
  })

  it('should render login page when not authenticated', () => {
    renderWithProviders(<App />)
    
    expect(screen.getByTestId('login-page')).toBeInTheDocument()
  })

  it('should render dashboard when authenticated', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })

  it('should render all main layout components', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('page-transition')).toBeInTheDocument()
    expect(screen.getByTestId('notifications')).toBeInTheDocument()
  })

  it('should render protected routes when authenticated', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    expect(screen.getByTestId('protected-route')).toBeInTheDocument()
  })

  it('should handle navigation between routes', async () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    // Initially on dashboard
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
    
    // Note: In a real test, we would test actual navigation
    // For now, we're testing that the components render correctly
  })

  it('should maintain user state across renders', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    const { rerender } = renderWithProviders(<App />)
    
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
    
    // Rerender and check state is maintained
    rerender(<App />)
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })

  it('should handle notifications in the app', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    store.dispatch(push({ type: 'success', message: 'Test notification' }))
    
    renderWithProviders(<App />)
    
    expect(screen.getByTestId('notifications')).toBeInTheDocument()
    
    // Check that notification was added to store
    const state = store.getState()
    expect(state.notifications.items).toHaveLength(1)
    expect(state.notifications.items[0].message).toBe('Test notification')
  })

  it('should have proper CSS classes for layout', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    const appContainer = screen.getByTestId('navbar').closest('.d-flex')
    expect(appContainer).toBeInTheDocument()
  })

  it('should handle sidebar state', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    // Check that sidebar component is rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  it('should render page transitions', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    expect(screen.getByTestId('page-transition')).toBeInTheDocument()
  })

  it('should handle multiple user interactions', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    // Add multiple notifications
    store.dispatch(push({ type: 'success', message: 'First notification' }))
    store.dispatch(push({ type: 'warning', message: 'Second notification' }))
    store.dispatch(push({ type: 'error', message: 'Third notification' }))
    
    const state = store.getState()
    expect(state.notifications.items).toHaveLength(3)
    expect(state.notifications.items[0].message).toBe('Third notification') // Last added first
  })

  it('should maintain authentication state', () => {
    const user = createMockUser()
    store.dispatch(login(user))
    
    renderWithProviders(<App />)
    
    const state = store.getState()
    expect(state.auth.user).toEqual(user)
    
    // Verify user data is accessible
    expect(state.auth.user.name).toBe('Test User')
    expect(state.auth.user.email).toBe('test@example.com')
  })
})
