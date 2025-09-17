import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { store } from '../store'

// Custom render function that includes providers
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store: customStore = store,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={customStore}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  risk: 'Moderate',
  ...overrides
})

export const createMockInvestment = (overrides = {}) => ({
  id: 1,
  asset: 'Stock',
  ticker: 'TEST',
  qty: 100,
  price: 10.50,
  sector: 'Technology',
  ...overrides
})

export const createMockTransaction = (overrides = {}) => ({
  id: 1,
  type: 'Buy',
  ticker: 'TEST',
  qty: 100,
  price: 10.50,
  amount: 1050,
  date: '2024-01-01',
  ...overrides
})

export const createMockGoal = (overrides = {}) => ({
  id: 1,
  title: 'Test Goal',
  targetAmount: 10000,
  currentAmount: 5000,
  deadline: '2024-12-31',
  priority: 'High',
  ...overrides
})

// Custom matchers
export const expectElementToBeInDocument = (element) => {
  expect(element).toBeInTheDocument()
}

export const expectElementToHaveText = (element, text) => {
  expect(element).toHaveTextContent(text)
}

export const expectElementToHaveClass = (element, className) => {
  expect(element).toHaveClass(className)
}

// Helper functions for testing
export const waitForElementToBeRemoved = async (element) => {
  await waitFor(() => {
    expect(element).not.toBeInTheDocument()
  })
}

export const mockFetch = (data) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
      ok: true,
      status: 200,
    })
  )
}

export const mockFetchError = (error = 'Network error') => {
  global.fetch = vi.fn(() =>
    Promise.reject(new Error(error))
  )
}

// Re-export everything from testing library
export * from '@testing-library/react'
export { userEvent }
