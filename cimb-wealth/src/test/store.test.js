import { describe, it, expect, beforeEach, vi } from 'vitest'
import { store } from '../store'
import { login, logout, updateRisk } from '../store'
import { push, remove, clear } from '../store'
import { toggleSidebar, setSidebar } from '../store'

describe('Redux Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    store.dispatch(clear())
    store.dispatch(logout())
    store.dispatch(setSidebar(false))
  })

  describe('Auth Slice', () => {
    it('should handle login action', () => {
      const user = { id: 1, name: 'Test User', email: 'test@example.com' }
      store.dispatch(login(user))
      
      const state = store.getState()
      expect(state.auth.user).toEqual(user)
    })

    it('should handle logout action', () => {
      const user = { id: 1, name: 'Test User', email: 'test@example.com' }
      store.dispatch(login(user))
      store.dispatch(logout())
      
      const state = store.getState()
      expect(state.auth.user).toBeNull()
    })

    it('should handle updateRisk action', () => {
      const user = { id: 1, name: 'Test User', risk: 'Moderate' }
      store.dispatch(login(user))
      store.dispatch(updateRisk('Aggressive'))
      
      const state = store.getState()
      expect(state.auth.user.risk).toBe('Aggressive')
    })

    it('should not update risk if no user is logged in', () => {
      store.dispatch(updateRisk('Aggressive'))
      
      const state = store.getState()
      expect(state.auth.user).toBeNull()
    })
  })

  describe('Notifications Slice', () => {
    it('should handle push notification', () => {
      const notification = { type: 'success', message: 'Test notification' }
      store.dispatch(push(notification))
      
      const state = store.getState()
      expect(state.notifications.items).toHaveLength(1)
      expect(state.notifications.items[0]).toMatchObject(notification)
      expect(state.notifications.items[0]).toHaveProperty('id')
    })

    it('should handle remove notification', () => {
      const notification = { type: 'success', message: 'Test notification' }
      store.dispatch(push(notification))
      
      const state = store.getState()
      const notificationId = state.notifications.items[0].id
      
      store.dispatch(remove(notificationId))
      
      const newState = store.getState()
      expect(newState.notifications.items).toHaveLength(0)
    })

    it('should handle clear all notifications', () => {
      store.dispatch(push({ type: 'success', message: 'Test 1' }))
      store.dispatch(push({ type: 'warning', message: 'Test 2' }))
      
      store.dispatch(clear())
      
      const state = store.getState()
      expect(state.notifications.items).toHaveLength(0)
    })

    it('should add notifications to the beginning of the array', () => {
      store.dispatch(push({ type: 'success', message: 'First' }))
      store.dispatch(push({ type: 'warning', message: 'Second' }))
      
      const state = store.getState()
      expect(state.notifications.items[0].message).toBe('Second')
      expect(state.notifications.items[1].message).toBe('First')
    })
  })

  describe('UI Slice', () => {
    it('should handle toggleSidebar action', () => {
      const initialState = store.getState()
      const initialCollapsed = initialState.ui.sidebarCollapsed
      
      store.dispatch(toggleSidebar())
      
      const state = store.getState()
      expect(state.ui.sidebarCollapsed).toBe(!initialCollapsed)
    })

    it('should handle setSidebar action', () => {
      store.dispatch(setSidebar(true))
      
      const state = store.getState()
      expect(state.ui.sidebarCollapsed).toBe(true)
      
      store.dispatch(setSidebar(false))
      
      const newState = store.getState()
      expect(newState.ui.sidebarCollapsed).toBe(false)
    })

    it('should persist sidebar state to localStorage', () => {
      const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      }
      global.localStorage = localStorageMock
      
      store.dispatch(setSidebar(true))
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('sidebar_collapsed', 'true')
    })
  })

  describe('Store Integration', () => {
    it('should maintain separate state slices', () => {
      const user = { id: 1, name: 'Test User' }
      const notification = { type: 'info', message: 'Test' }
      
      store.dispatch(login(user))
      store.dispatch(push(notification))
      store.dispatch(setSidebar(true))
      
      const state = store.getState()
      
      expect(state.auth.user).toEqual(user)
      expect(state.notifications.items).toHaveLength(1)
      expect(state.ui.sidebarCollapsed).toBe(true)
    })

    it('should handle multiple actions in sequence', () => {
      const user = { id: 1, name: 'Test User' }
      
      store.dispatch(login(user))
      store.dispatch(updateRisk('Aggressive'))
      store.dispatch(push({ type: 'success', message: 'Risk updated' }))
      store.dispatch(toggleSidebar())
      
      const state = store.getState()
      
      expect(state.auth.user.risk).toBe('Aggressive')
      expect(state.notifications.items).toHaveLength(1)
      expect(state.ui.sidebarCollapsed).toBe(true)
    })
  })
})
